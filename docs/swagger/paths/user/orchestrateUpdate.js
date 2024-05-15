import { response } from "../../definitions/common/response.js";

export const OrchestrateUpdate = {
  put: {
    tags: ["User [admin]"],
    summary: "Orchestrate update user data",
    parameters: [
      {
        name: "uuid",
        in: "path",
        description: "User uuid",
        required: true,
        type: "string",
      },
      {
        name: "payload",
        in: "body",
        description: "payload",
        schema: {
          $ref: "#/definitions/UserOrchestrateUpdateReq",
        },
      },
    ],
    produces: ["application/json"],
    responses: {
      200: {
        description: "User is updated",
        schema: response(),
      },
    },
  },
};
