#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error
set -e
sudo chmod a+x /var/run/docker.sock
# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1

CC_SRC_LANGUAGE=${1:-"go"}
CC_SRC_LANGUAGE=`echo "$CC_SRC_LANGUAGE" | tr [:upper:] [:lower:]`
if [ "$CC_SRC_LANGUAGE" = "go" -o "$CC_SRC_LANGUAGE" = "golang" ] ; then
	CC_SRC_PATH="../chaincode/patientchain/go/"
elif [ "$CC_SRC_LANGUAGE" = "javascript" ]; then
	CC_SRC_PATH="../chaincode/patientchain/javascript/"
else
	echo The chaincode language ${CC_SRC_LANGUAGE} is not supported by this script
	echo Supported chaincode languages are: go, java, javascript, and typescript
	exit 1
fi

# launch network; create channel and join peer to channel
pushd ../test-network-patient-chain
./network.sh down
./network.sh up createChannel -ca -s couchdb
./network.sh deployCC -ccn patient -ccv 1 -cci InitLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}
popd

cd web-app/servers/
rm -rf wallet

# cd ../../
# DOCKER_COMPOSE_FILE="docker-compose.yaml"
# chmod a+x $DOCKER_COMPOSE_FILE
# docker-compose up --build -d

# docker network connect fabric_test fsc_node
# docker network connect fabric_test fsc_react
