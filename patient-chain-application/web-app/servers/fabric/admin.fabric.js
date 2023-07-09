"use strict";

import network from "./network.fabric.js";

const registerUser = async (orgName, userId) => {
    await network.registerUser(orgName, userId, "admin");
};

const enrollAdmin = async (organization, id) => {
    await network.enrollAdmin(organization, id);
};

export default {
    registerUser,
    enrollAdmin,
};
