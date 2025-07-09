const Joi = require("joi");

class PostValidator {
  static #createPostSchema = Joi.object({
    title: Joi.string().min(2).max(200).required().messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 2 characters",
      "string.max": "Title cannot exceed 200 characters",
    }),
    description: Joi.string().min(10).required().messages({
      "string.empty": "Description is required",
      "string.min": "Description must be at least 10 characters",
    }),
    category: Joi.string()
      .valid("technology", "nature", "business", "health", "entertainment")
      .required()
      .messages({
        "any.only": "Invalid category selected",
      }),
  });

  static #updatePostSchema = Joi.object({
    title: Joi.string().min(2).max(200),
    description: Joi.string().min(10),
    category: Joi.string().valid(
      "technology", "nature", "business", "health", "entertainment"
    ),
  }).min(1);

  // Middleware for validating post creation
  static validateCreatePost = (req, res, next) => {
    const { error } = this.#createPostSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next();
  };

  // Middleware for validating post updates
  static validateUpdatePost = (req, res, next) => {
    const { error } = this.#updatePostSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
}

module.exports = PostValidator;
