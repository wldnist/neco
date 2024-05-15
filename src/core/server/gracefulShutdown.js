export const gracefulShutdown = (
  { dbClient, inMemoryRepositoryClient },
  callback,
) => {
  console.log("Shutting down...");
  Promise.all([dbClient.destroy(), inMemoryRepositoryClient.quit()])
    .then(() => {
      console.log("Shutdown complete.");
      callback(null);
    })
    .catch((err) => {
      console.error("Error during shutdown:", err);
      callback(err);
    });
};
