const Joi = require("joi");

class CategoryValidator {
  static #createCategorySchema = Joi.object({
    title: Joi.string().trim().required().messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
  });

  static #updateCategorySchema = Joi.object({
    title: Joi.string().trim().messages({
      "string.empty": "Title is required",
    }),
  }).min(1);

  static validateCreateCategory = (req, res, next) => {
    const { error } = this.#createCategorySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(err => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next();
  };

  static validateUpdateCategory = (req, res, next) => {
    const { error } = this.#updateCategorySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(err => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
}

module.exports = CategoryValidator;
