const Joi = require("joi");

exports.createPostValidator = Joi.object({
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

exports.updatePostValidator = Joi.object({
  title: Joi.string().min(2).max(200),
  description: Joi.string().min(10),
  category: Joi.string().valid(
    "technology", "nature", "business", "health", "entertainment"
  ),
}).min(1);