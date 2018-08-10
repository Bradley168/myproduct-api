module.exports.success = (res, data, metadata) => {
  return res.status(200).send({
    message: "Success",
    data: data || [],
    metadata: metadata
  });
}

module.exports.successDetail = (res, data) => {
  return res.status(200).send(data);
}

module.exports.error = (res, message = "Error", data, metadata) => {
  return res.status(400).send({
    message: message,
    data: data,
    metadata: metadata
  });
}
