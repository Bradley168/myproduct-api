module.exports.ERRORTYPE = {
  BAD_REQUEST: 1,
  NOT_FOUND: 2,
  UNKNOWN: 3
}

module.exports.submit = (res, message = "Unexpected error") => {
  return res.status(500).send({
    message: message
  });
}