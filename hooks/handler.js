'use strict'

var fs = require("fs");

module.exports = async (event, context) => {
  const res = fs.readFileSync("/var/openfaas/secrets/secret", "utf8")

  return context
    .status(200)
    .succeed(res)
}

