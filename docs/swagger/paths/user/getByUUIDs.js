import { response } from "../../definitions/common/response.js";

export const GetByUUIDs = {
  post: {
    tags: ["User [admin]"],
    summary: "Retrieve users by uuids",
    parameters: [
      {
        name: "payload",
        in: "body",
        description: "payload",
        schema: {
          $ref: "#/definitions/UserGetByUUIDsReq",
        },
      },
    ],
    responses: {
      200: {
        description: "OK",
        schema: response("Users"),
      },
    },
  },
};
