import Joi from "joi";

export const generalFields = {
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
    password: Joi.string()
    // .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  cPassword: Joi.string().valid(Joi.ref("password")).required(),
  file: Joi.object({
    size: Joi.number().positive().required(),
    path: Joi.string().required(),
    filename: Joi.string().required(),
    destination: Joi.string().required(),
    mimetype: Joi.string().required(),
    encoding: Joi.string().required(),
    originalname: Joi.string().required(),
    fieldname: Joi.string().required(),
  }),
};

export const validation = (schema) => {
  return (req, res, next) => {
    const requestData = {
      ...req.query,
      ...req.body,
      ...req.params,
    };
    if (req.file || req.files) {
      requestData.file = req.file || req.files;
    }
    const validationResult = schema.validate(requestData, {
      abortEarly: false,
    });
    if (validationResult?.error) {
      return res
        .status(400)
        .json({
          message: "validation error",
          Error: validationResult.error.message
        });
    }
    return next();
  };
};
