"use strict";

import pkg from "fabric-ca-client";
import { Wallets, Gateway } from "fabric-network";
import appUtil from "./app.fabric.js";
import caUtil from "./ca.fabric.js";
import path from "path";

const getConnectionMaterial = (orgName) => {
    const connectionMaterial = {};
    const _orgName = orgName.toUpperCase();

    connectionMaterial.walletPath = path.join(
        process.cwd(),
        process.env[`${_orgName}_WALLET`]
    );

    connectionMaterial.orgMSP = process.env[`${_orgName}_MSP`];

    return connectionMaterial;
};

const connect = async (orgName, userId, contractName) => {
    const gateway = new Gateway();

    const ccp = appUtil.buildCCPOrg(orgName);
    const connectionMaterial = getConnectionMaterial(orgName);
    const wallet = await appUtil.buildWallet(
        Wallets,
        connectionMaterial.walletPath
    );
    await gateway.connect(ccp, {
        wallet,
        identity: userId.toString(),
        discovery: {
            enabled: true,
            asLocalhost: Boolean(process.env.AS_LOCALHOST),
        },
    });
    const network = await gateway.getNetwork(process.env.CHANNEL);
    const contract = await network.getContract(contractName);

    console.log("Connected to fabric network successly.");

    const networkObj = { gateway, network, contract };

    return networkObj;
};

const query = async (networkObj, fcn, ...funcAndArgs) => {
    console.log(`Query parameter: ${funcAndArgs}`);
    const funcAndArgsStrings = funcAndArgs.map((elem) => String(elem));
    const response = await networkObj.contract.evaluateTransaction(
        fcn,
        ...funcAndArgsStrings
    );
    try {
        console.log(`Transaction ${fcn} has been evaluated: ${response}`);
        return appUtil.prettyJSONString(response);
    } catch (error) {
        console.log(`Transaction ${fcn} has been errored`);
        return false;
    }
};

const invoke = async (networkObj, fcn, ...funcAndArgs) => {
    console.log(`Invoke parameter: ${funcAndArgs}`);
    const funcAndArgsStrings = funcAndArgs.map((elem) => String(elem));
    await networkObj.contract.submitTransaction(fcn, ...funcAndArgsStrings);
    console.log(`Transaction ${fcn} has been submitted: ${funcAndArgs}`);
};

const enrollAdmin = async (orgName, adminId) => {
    const ccp = appUtil.buildCCPOrg(orgName);
    const caClient = caUtil.buildCAClient(pkg, ccp, `ca.${orgName}.scm.com`);
    const connectionMaterial = getConnectionMaterial(orgName);
    const wallet = await appUtil.buildWallet(
        Wallets,
        connectionMaterial.walletPath
    );
    await caUtil.enrollAdmin(
        caClient,
        wallet,
        connectionMaterial.orgMSP,
        adminId
    );
};

const registerUser = async (orgName, userId, adminId) => {
    const ccp = appUtil.buildCCPOrg(orgName);
    const caClient = caUtil.buildCAClient(pkg, ccp, `ca.${orgName}.scm.com`);
    const connectionMaterial = getConnectionMaterial(orgName);
    const wallet = await appUtil.buildWallet(
        Wallets,
        connectionMaterial.walletPath
    );
    await caUtil.registerAndEnrollUser(
        caClient,
        wallet,
        connectionMaterial.orgMSP,
        userId,
        adminId,
        `${orgName}.department`
    );
};

export default {
    connect,
    query,
    invoke,
    enrollAdmin,
    registerUser,
};
