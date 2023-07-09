docker compose down -v

rm -rf organizations
cp -r "${PWD}/../test-network-patient-chain/organizations/" .