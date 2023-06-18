"use strict";

/**
 *
 * @param {*} values
 * @param {*} res
 */
const response = (values, res) => {
  res.status(200).send(typeof values == "object" ? values : values.toString());
};

export default response;
