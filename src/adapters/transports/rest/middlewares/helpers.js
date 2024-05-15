export function newHandlerWithExceptionCatcher(handlerFunc) {
  return async (req, res, next) => {
    try {
      await handlerFunc(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}
