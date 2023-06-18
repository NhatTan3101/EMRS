"use strict"

import network from "./network.fabric.js"

const chaincode = process.env.CHAINCODE_NAME

/**
 * @param {string} orgName 
 * @param {string} adminId 
 * @param {string} email 
 * @param {string} password 
 * @param {string} username 
 * @param {string} addrress 
 * @param {string} role 
 * @returns {}
 */
const signUp = async (orgName, userId) => {
  await network.registerUser(orgName, userId, "admin")
}

/**
 * @param {string} orgName 
 * @param {string} email
 * @param {string} password
 * @returns {User}
 */
const signIn = async (orgName, userId, email, password) => {
  const networkObj = await network.connect(orgName, userId, chaincode)
  return await network.query(networkObj, "SignIn", email, password, orgName)
}

/**
 * 
 * @param {string} orgName 
 * @param {string} userId 
 * @param {string} password 
 * @param {string} username 
 * @param {string} address 
 * @param {string} status 
 * @returns 
 */
const changeInfoUser = async (orgName, userId, adminId, password, username, address, status) => {
  const networkObj = await network.connect(orgName, adminId, chaincode)
  await network.invoke(networkObj, "ChangeUserInfo", userId, password, username, address, status)
}

const enrollAdmin = async (organization, id) => {
  await network.enrollAdmin(organization, id)
}

export default {
  signIn,
  signUp,
  changeInfoUser,
  enrollAdmin
}
