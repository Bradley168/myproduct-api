module.exports.ERRORTYPE = {
  BAD_REQUEST: 1,
  NOT_FOUND: 2,
  UNKNOWN: 3
}

module.exports.submit = (res, errType, message = "Unexpected error") => {
  if (errType === this.ERRORTYPE.BAD_REQUEST) res.status(400).send({
    message: 'Bad request.'
  });
  else if (errType === this.ERRORTYPE.NOT_FOUND) res.status(404).send({
    message: 'Not found.'
  });
  else if (errType === this.ERRORTYPE.UNKNOWN) res.status(500).send({
    message: message
  });
}