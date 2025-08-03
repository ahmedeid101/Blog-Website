const Joi = require("joi");

class CommentValidator {
  // Schema for creating a new comment
  static #createCommentSchema = Joi.object({
    text: Joi.string().min(1).max(1000).required().messages({
      "string.empty": "content text is required",
      "string.min": "content text must be at least 1 characters",
      "string.max": "content text cannot exceed 1000 characters",
      "any.required": "content text is required",
    }),

    postId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "Invalid post ID format",
        "any.required": "Post ID is required",
    }),

  });

  // Schema for updating an existing comment
  static #updateCommentSchema = Joi.object({
    text: Joi.string()
      .min(1)
      .max(1000)
      .messages({
        "string.empty": "Comment text is required",
        "string.min": "Comment must be at least 1 character",
        "string.max": "Comment cannot exceed 1000 characters",
      }),
  }).min(1);

  // Middleware for validating comment creation
  static validateCreateComment = (req, res, next) => {
    const { error } = this.#createCommentSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next();
  };

  // Middleware for validating comment updates
  static validateUpdateComment = (req, res, next) => {
    const { error } = this.#updateCommentSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
}

module.exports = CommentValidator;