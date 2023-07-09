"use strict"

import network from "./network.fabric.js"

const chaincode = process.env.CHAINCODE_NAME
const orgName = "patient"

// /**
//  * @param {string} patientId 
//  * @param {string} hashCode 
//  */
// const createHashCode = async (hashCode) => {
//   const networkObj = await network.connect(orgName, patientId, chaincode)
//   await network.invoke(networkObj, "CreateRaw", patientId, rawId, recordId, createDate, status, hashCode)
// }

/**
 * @param {string} patientId 
 * @param {string} recordId
 * @param {string} hashCode 
 */
const updateHashCode = async (patientId, hashCode, recordId) => {
  const networkObj = await network.connect(orgName, patientId, chaincode)
  await network.invoke(networkObj, "UpdateHashCode", patientId, hashCode, recordId)
}

export default {
  updateHashCode,
}