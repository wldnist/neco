class AppError extends Error {
  constructor(name, message) {
    super(message);

    this.name = name;
  }
}

export const PERIOD_NOT_VALID_ERROR_NAME = "PERIOD_NOT_VALID";
export const REQUIRED_FIELD_ERROR_NAME = "REQUIRED_FIELD";
export const DATA_NOT_FOUND_ERROR_NAME = "DATA_NOT_FOUND";
export const DUPLICATE_DATA_ERROR_NAME = "DUPLICATE_DATA";
export const MULTIPLE_DATA_FOUND_ERROR_NAME = "MULTIPLE_DATA_FOUND";
export const UNAUTHENTICATED_ERROR_NAME = "UNAUTHENTICATED";
export const NO_TOKEN_PROVIDED_ERROR_NAME = "NO_TOKEN_PROVIDED";
export const TOKEN_REJECTED_ERROR_NAME = "TOKEN_REJECTED";
export const INCOMPLETE_DATA_ERROR_NAME = "INCOMPLETE_DATA";
export const MULTIPLE_LOGIN_FOUND_ERROR_NAME = "MULTIPLE_LOGIN_FOUND";
export const INVALID_OTP_ERROR_NAME = "INVALID_OTP";
export const OTP_EXPIRED_ERROR_NAME = "OTP_EXPIRED";
export const UNIDENTIFIED_DEVICE_FOUND_ERROR_NAME = "UNIDENTIFIED_DEVICE_FOUND";
export const INACTIVE_ACCOUNT_ERROR_NAME = "INACTIVE_ACCOUNT";
export const UNVERIFIED_ACCOUNT_ERROR_NAME = "UNVERIFIED_ACCOUNT";
export const DEVICE_HAS_BEEN_REGISTERED_ERROR_NAME =
  "DEVICE_HAS_BEEN_REGISTERED";
export const EMPTY_TOKEN_ERROR_NAME = "EMPTY_TOKEN";
export const TOKEN_HAS_EXPIRED_ERROR_NAME = "TOKEN_HAS_EXPIRED";

export const PeriodNotValidError = new AppError(
  PERIOD_NOT_VALID_ERROR_NAME,
  "period is not valid",
);

export const RequiredFieldsError = ({ field }) =>
  new AppError(REQUIRED_FIELD_ERROR_NAME, `${field} is required`);

export const UnauthenticatedError = ({ errorMessage }) =>
  new AppError(UNAUTHENTICATED_ERROR_NAME, errorMessage);

export const DataNotFoundError = new AppError(
  DATA_NOT_FOUND_ERROR_NAME,
  "data not found",
);

export const DuplicateDataError = new AppError(
  DUPLICATE_DATA_ERROR_NAME,
  "data is exist",
);

export const MultipleDataFoundError = new AppError(
  MULTIPLE_DATA_FOUND_ERROR_NAME,
  "multiple data found",
);

export const NoTokenProvidedError = new AppError(
  NO_TOKEN_PROVIDED_ERROR_NAME,
  "no token provided",
);

export const TokenRejectedError = new AppError(
  TOKEN_REJECTED_ERROR_NAME,
  "token rejected",
);

export const IncompleteDataError = new AppError(
  INCOMPLETE_DATA_ERROR_NAME,
  "data incomplete",
);

export const MultipleLoginFoundError = new AppError(
  MULTIPLE_LOGIN_FOUND_ERROR_NAME,
  "multiple login found",
);

export const InvalidOTPError = new AppError(
  INVALID_OTP_ERROR_NAME,
  "invalid otp",
);

export const OTPExpiredError = new AppError(
  OTP_EXPIRED_ERROR_NAME,
  "otp expired",
);

export const UnidentifiedDeviceFoundError = new AppError(
  UNIDENTIFIED_DEVICE_FOUND_ERROR_NAME,
  "unidentified device found",
);

export const InactiveAccountError = new AppError(
  INACTIVE_ACCOUNT_ERROR_NAME,
  "your account is inactive, please contact administrator!",
);

export const UnverifiedAccountError = new AppError(
  UNVERIFIED_ACCOUNT_ERROR_NAME,
  "your account is still not verified yet.",
);

export const DeviceHasBeenRegisteredError = new AppError(
  DEVICE_HAS_BEEN_REGISTERED_ERROR_NAME,
  "this device has been registered to another account, please contact administrator!",
);

export const EmptyTokenError = new AppError(
  EMPTY_TOKEN_ERROR_NAME,
  "empty token found",
);

export const TokenHasExpiredError = new AppError(
  TOKEN_HAS_EXPIRED_ERROR_NAME,
  "token has expired",
);

export default AppError;
