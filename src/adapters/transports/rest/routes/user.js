class UserRouter {
  constructor({ expressRouter, userRouteHandler, auth }) {
    this.router = expressRouter;
    this.routeHandler = userRouteHandler;
    this.auth = auth;
  }

  route = () => {
    /** ADMIN */
    this.router.get("/", this.auth.authenticate, (...args) =>
      this.routeHandler.list(...args),
    );

    this.router.post("/ids", this.auth.authenticate, (...args) =>
      this.routeHandler.getByIds(...args),
    );

    this.router.post("/uuids", this.auth.authenticate, (...args) =>
      this.routeHandler.getByUUIDs(...args),
    );

    this.router.get("/:id", this.auth.authenticate, (...args) =>
      this.routeHandler.get(...args),
    );

    this.router.get("/uuid/:uuid", this.auth.authenticate, (...args) =>
      this.routeHandler.getByUUID(...args),
    );

    this.router.get("/email/:email", this.auth.authenticate, (...args) =>
      this.routeHandler.getByEmail(...args),
    );

    this.router.post("/create", this.auth.authenticate, (...args) =>
      this.routeHandler.create(...args),
    );

    this.router.post("/orchestrate/create", this.auth.authenticate, (...args) =>
      this.routeHandler.orchestrateCreateUser(...args),
    );

    this.router.put("/:uuid/update", this.auth.authenticate, (...args) =>
      this.routeHandler.update(...args),
    );

    this.router.put(
      "/:uuid/orchestrate/update",
      this.auth.authenticate,
      (...args) => this.routeHandler.orchestrateUpdateUser(...args),
    );

    this.router.delete("/:uuid/delete", this.auth.authenticate, (...args) =>
      this.routeHandler.delete(...args),
    );

    this.router.post("/login", (...args) => this.routeHandler.login(...args));

    this.router.post("/logout", this.auth.authenticate, (...args) =>
      this.routeHandler.logout(...args),
    );

    this.router.post("/token", (...args) =>
      this.routeHandler.getNewToken(...args),
    );

    this.router.post("/token/authenticate", (...args) =>
      this.routeHandler.authenticateToken(...args),
    );

    this.router.get(
      "/:uuid/branches",
      // this.auth.authenticate,
      (...args) => this.routeHandler.getUserBranches(...args),
    );

    return this.router;
  };
}

export default UserRouter;
