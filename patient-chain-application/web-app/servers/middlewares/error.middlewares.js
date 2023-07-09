"use strict";

/**
 *
 * @param {*} code
 * @param {*} error
 * @param {*} res
 */
const handleError = async (code, error, res) => {
  const errorMessage = error.toString();
  if (errorMessage == "[object Object]") {
    res.status(code).send(error);
  } else {
    res.status(code).send(errorMessage);
  }
};

export default handleError;
