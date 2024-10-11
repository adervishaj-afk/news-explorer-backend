module.exports = {
  BAD_REQUEST: 400,
  AUTHENTICATION_ERROR: 401,
  PERMISSION_ERROR: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  DUPLICATE_EMAIL: 409,

  BadRequestError: "Server could not understand request",
  AuthorizationError: "User is not authorized to perform this action",

  PermissionsError: "You do not have permission to delete this item",
  ValidationError: "Could not find data",
  NotFoundError: "Document not found",
  CastError: "Information entered is not valid",
  ServerError: "An unexpected error occurred. Please try again later.",
  ExistingUser: "User with this email already exists",
  SuccesfulAuthentication:
    "authentication successful! user is in the user variable",
  AuthenticationError: "Could not authenticate the user",

  CreateItemError: "Error from createItem",
  GetItemsError: "Error from getItem",
  UpdateItemError: "Error from updateItem",
  DeleteItemError: "Error from deleteItem",
};
