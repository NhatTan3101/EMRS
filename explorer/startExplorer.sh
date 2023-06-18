docker compose down -v

rm -rf organizations
sudo chown -R hyperledger:hyperledger "${PWD}/../test-network-supply-chain/organizations/"
cp -r "${PWD}/../test-network-supply-chain/organizations/" .

function json_ccp {
    sed -e "s/\${KEY}/$1/" "${PWD}/connection-profile/test-network-template.json"
}

KEY=$(cd ${PWD}/organizations/peerOrganizations/patient.scm.com/users/User1@patient.scm.com/msp/keystore && ls *_sk)
echo "$(json_ccp $KEY)" > "${PWD}/connection-profile/test-network.json"

docker compose up -d

docker network connect fabric_test explorer.mynetwork.com

