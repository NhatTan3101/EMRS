import network from "./network.fabric.js";

const chaincode = "supply";
const orgName = "doctor";

const createRecord = async (
    recordId,
    hash,
    identity
) => {
    const networkObj = await network.connect(orgName, identity, chaincode);
    await network.invoke(
        networkObj,
        "CreateRecord",
        recordId,
        hash,
    );
};

const updateRecord = async (
    recordId,
    hash,
    identity
) => {
    const networkObj = await network.connect(orgName, identity, chaincode);
    await network.invoke(
        networkObj,
        "UpdateRecord",
        recordId,
        hash,
    );
};

const getRecord = async (
    recordId,
    identity
) => {
    const networkObj = await network.connect(orgName, identity, chaincode);
    return await network.query(
        networkObj,
        "getRecord",
        recordId,
    );
};

export default {
    createRecord,
    updateRecord,
    getRecord
}