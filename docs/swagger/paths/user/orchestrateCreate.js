import { response } from "../../definitions/common/response.js";

export const OrchestrateCreate = {
  post: {
    tags: ["User [admin]"],
    summary: "Orchestrate create user data",
    parameters: [
      {
        name: "payload",
        in: "body",
        description: "payload",
        schema: {
          $ref: "#/definitions/UserOrchestrateCreateReq",
        },
      },
    ],
    produces: ["application/json"],
    responses: {
      201: {
        description: "New user is created",
        schema: response(),
      },
    },
  },
};
