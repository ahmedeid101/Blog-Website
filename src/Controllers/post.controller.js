const asyncHandler = require("express-async-handler");
const cloudinary = require("../Utils/cloudinary");

class PostController {
  constructor(postService, postValidator) {
    this.postService = postService;
    this.postValidator = postValidator;
  }

  createPost = asyncHandler(async (req, res) => {
    let postData;
    try {
      // Prepare post data
      postData = {
        ...req.body,
        user: req.user.id,
      };

      // Handle image upload if exists
      if (req.file) {
        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "post-images" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(req.file.buffer);
        });

        postData.image = {
          url: result.secure_url,
          publicId: result.public_id,
        };
      }

      // Create post
      const post = await this.postService.createPost(postData);

      res.status(201).json({ success: true, data: post });
    } catch (error) {
      // 4. Cleanup if upload failed
      if (postData?.image?.publicId) {
        await cloudinary.uploader.destroy(postData.image.publicId);
      }
      res.status(400).json({ success: false, error: error.message });
    }
  });

  getPost = asyncHandler(async (req, res) => {
  const post = await this.postService.getPostById(req.params.id, req.user);
  res.status(200).json({ success: true, data: post });
  });

  getAllPosts = asyncHandler(async (req, res) => {
    const posts = await this.postService.getAllPosts(req.user, req.query);
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  });

  updatePost = asyncHandler(async (req, res) => {
    let updateData = { ...req.body };
    // Check if file uploaded
    if (req.file) {
      // Upload new image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "post-images" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(req.file.buffer);
      });

      //delete old image
      const existingPost = await this.postService.getPostById(req.params.id);
      if (existingPost.image?.publicId) {
        await cloudinary.uploader.destroy(existingPost.image.publicId);
      }

      updateData.image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    // Update post
    const updatedPost = await this.postService.updatePost(
      req.params.id,
      req.body
    );
    res.status(200).json({ success: true, data: updatedPost });
  });

  deletePost = asyncHandler(async (req, res) => {
    //delete post image
    const existingPost = await this.postService.getPostById(req.params.id);
    if (existingPost.image?.publicId) {
      await cloudinary.uploader.destroy(existingPost.image.publicId);
    }
    await this.postService.deletePost(req.params.id);
    res.status(200).json({ success: true, data: "Post Deleted Successfully" });
  });

  likePost = asyncHandler(async (req, res) => {
    const post = await this.postService.likePost(req.params.id, req.user.id);
    res.status(200).json({ success: true, data: post });
  });

  unlikePost = asyncHandler(async (req, res) => {
    const post = await this.postService.unlikePost(req.params.id, req.user.id);
    res.status(200).json({ success: true, data: post });
  });
}

module.exports = PostController;
