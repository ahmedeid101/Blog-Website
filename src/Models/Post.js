const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a post title"],
    trim: true,
    minlength: [2, "Title must be at least 2 characters"],
    maxlength: [200, "Title cannot exceed 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: [true, "Please select a category"],
    enum: {
      values: ["technology", "nature", "business", "health", "entertainment"],
      message: "Invalid category selection",
    },
  },
  image: {
    type: {
      url: String,
      publicId: String,
    },
    default: {
      url: "",
      publicId: null,
    },
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true } 
});

// Add virtual for comments (if you'll have comments)
postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
  justOne: false,
});

// Cascade delete comments when post is deleted
postSchema.pre("deleteOne", { document: true }, async function (next) {
  await this.model("Comment").deleteMany({ post: this._id });
  next();
});

module.exports = mongoose.model("Post", postSchema);