"use strict"

import network from "./network.fabric.js"

const chaincode = process.env.CHAINCODE_NAME

/**
 * @param {string} orgName
 * @param {string} patientId 
 * @param {string} recordId
 * @returns {HashCode}
 */
const getRaw = async (orgName, userId, recordId) => {
  const networkObj = await network.connect(orgName, userId, chaincode)
  return await network.query(networkObj, "GetHashCode", recordId)
}

export default {
  getRaw,
};