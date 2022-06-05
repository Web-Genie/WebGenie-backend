exports.HTTP_STATUS_CODE = {
  REQUEST_SUCCESS: 200,
  CREATE_SUCCESS: 201,
};

exports.ERROR_STATUS_CODE = {
  BAD_REQUEST: 400,
  UNAUTHROIZED: 401,
  NOT_FOUND_DATA: 404,
  INTERNAL_SERVER_ERROR: 500,
};

exports.HTTP_STATUS_MESSAGE = {
  SUCCESS_CREATE: "make it successful",
  SUCESS_EDIT: "modified successful",
  SUCCESS_REQUEST: "request was successful",
};

exports.ERROR_MESSAGE = {
  NOT_FOUND_DATA: "data not found",
  OCCURRED_SERVER_ERROR: "occurred server error",
  NO_DATA: "there is no data",
  NOT_AUTHENTICATED: "not authenticated",
};
