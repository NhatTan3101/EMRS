#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error
set -e
sudo chmod a+x /var/run/docker.sock

# launch network; create channel and join peer to channel
pushd ../test-network-supply-chain
./network.sh down
popd

cd web-app/servers/
rm -rf identity
