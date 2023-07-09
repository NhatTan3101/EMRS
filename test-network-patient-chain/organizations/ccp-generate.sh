#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        -e "s/\${MSP}/$6/" \
        organizations/ccp-template.json
}

ORG=patient
MSP=Patient
P0PORT=7051
CAPORT=7054
PEERPEM=organizations/peerOrganizations/patient.scm.com/tlsca/tlsca.patient.scm.com-cert.pem
CAPEM=organizations/peerOrganizations/patient.scm.com/ca/ca.patient.scm.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM $MSP)" > organizations/peerOrganizations/patient.scm.com/connection-patient.json

ORG=doctor
MSP=Doctor
P0PORT=7061
CAPORT=7064
PEERPEM=organizations/peerOrganizations/doctor.scm.com/tlsca/tlsca.doctor.scm.com-cert.pem
CAPEM=organizations/peerOrganizations/doctor.scm.com/ca/ca.doctor.scm.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM $MSP)" > organizations/peerOrganizations/doctor.scm.com/connection-doctor.json

cp -r "${PWD}/organizations/peerOrganizations/patient.scm.com/connection-patient.json" "${PWD}/../patient-chain-application/web-app/servers/connections"
cp -r "${PWD}/organizations/peerOrganizations/doctor.scm.com/connection-doctor.json" "${PWD}/../patient-chain-application/web-app/servers/connections"
