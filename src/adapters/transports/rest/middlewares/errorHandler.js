import AppError, {
  DATA_NOT_FOUND_ERROR_NAME,
  DEVICE_HAS_BEEN_REGISTERED_ERROR_NAME,
  DUPLICATE_DATA_ERROR_NAME,
  INACTIVE_ACCOUNT_ERROR_NAME,
  INCOMPLETE_DATA_ERROR_NAME,
  MULTIPLE_DATA_FOUND_ERROR_NAME,
  NO_TOKEN_PROVIDED_ERROR_NAME,
  PERIOD_NOT_VALID_ERROR_NAME,
  REQUIRED_FIELD_ERROR_NAME,
  TOKEN_REJECTED_ERROR_NAME,
  UNAUTHENTICATED_ERROR_NAME,
  UNIDENTIFIED_DEVICE_FOUND_ERROR_NAME,
  UNVERIFIED_ACCOUNT_ERROR_NAME,
} from "../../../../core/ports/error.js";
import { failedResponse } from "./responseBuilder.js";

const clientErrorsMapByStatusCode = {
  400: [DUPLICATE_DATA_ERROR_NAME],
  401: [
    UNAUTHENTICATED_ERROR_NAME,
    NO_TOKEN_PROVIDED_ERROR_NAME,
    PERIOD_NOT_VALID_ERROR_NAME,
    TOKEN_REJECTED_ERROR_NAME,
    UNIDENTIFIED_DEVICE_FOUND_ERROR_NAME,
    UNVERIFIED_ACCOUNT_ERROR_NAME,
    INACTIVE_ACCOUNT_ERROR_NAME,
    DEVICE_HAS_BEEN_REGISTERED_ERROR_NAME,
  ],
  404: [DATA_NOT_FOUND_ERROR_NAME],
  409: [MULTIPLE_DATA_FOUND_ERROR_NAME],
  422: [INCOMPLETE_DATA_ERROR_NAME, REQUIRED_FIELD_ERROR_NAME],
};

export const errorHandler = (error, req, res, next) => {
  let returnedError = {
    statusCode: 500,
    errorMessage: error,
  };

  if (error instanceof AppError) {
    for (const statusCode in clientErrorsMapByStatusCode) {
      if (clientErrorsMapByStatusCode[statusCode].includes(error.name)) {
        returnedError = {
          statusCode: parseInt(statusCode),
          errorMessage: error.message,
        };

        break;
      }
    }
  }

  if (returnedError.statusCode >= 500) {
    console.log("Server error occured", error);
  }

  res
    .status(returnedError.statusCode)
    .json(failedResponse({ errorMessage: returnedError.errorMessage }));
};
