module.exports.success = (res, data, metadata) => {
  res.status(200).send({
    message: "Success",
    data: data,
    metadata: metadata
  });
}

module.exports.error = (res, message = "Error", data, metadata) => {
  res.status(400).send({
    message: message,
    data: data,
    metadata: metadata
  });
}
