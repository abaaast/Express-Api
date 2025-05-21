const STATUS = require("./constant");

const success = (res, message = "Success", data = null, statusCode = STATUS.OK) => {
  return res.status(statusCode).json({
    status: true,
    message,
    data,
  });
};

const error = (res, message = "Something went wrong", statusCode = STATUS.INTERNAL_SERVER_ERROR) => {
  return res.status(statusCode).json({
    status: false,
    message,
    data: null,
  });
};

module.exports = { success, error };
