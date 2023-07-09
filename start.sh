starttime=$(date +%s)

cd patient-chain-application
./startApplication.sh

cd ../explorer
./startExplorer.sh

cat <<EOF

Total setup execution time : $(($(date +%s) - starttime)) secs ...
Web App is starting at http://localhost:3333
API Server is starting at http://localhost:5555
Hyperledger Explorer is starting at http://localhost:8080

EOF
