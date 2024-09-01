const messageList = {
  400: "Bad Request",
  404: "Not Found",
  409: "Duplicate",
};

const requestError = (status, message = messageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default requestError;
