export const successResponse = ({ data = [] } = {}) => {
  return {
    status: "success",
    data: data,
    error_message: "",
  };
};

export const failedResponse = ({ errorMessage = "" } = {}) => {
  return {
    status: "failed",
    data: [],
    error_message: errorMessage,
  };
};
