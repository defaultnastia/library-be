import requestError from "../helpers/requestError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(requestError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
