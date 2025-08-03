const asyncHandler = require("express-async-handler");

class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }

    createComment = asyncHandler(async(req, res) =>{
        const {postId, text} = req.body;
        const comment = await this.commentService.createComment({
            text,
            postId,
            user: req.user._id,
            username: req.user.username
        })
        res.status(201).json({ success: true, data: comment });
    });

    getAllComments = asyncHandler(async (req, res) => {
        const comments = await this.commentService.getAllComments();
        res.status(200).json({ success: true, data: comments });
    });

    getCommentById = asyncHandler(async (req, res) => {
        const comment = await this.commentService.getCommentById(req.params.id);
        res.status(200).json({ success: true, data: comment });
    });

    updateComment = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;
        const user = req.user;

        const updated = await this.commentService.updateComment(id, updateData, user);
        res.status(200).json({ success: true, data: updated });
    });

    deleteComment = asyncHandler(async (req, res) => {
        await this.commentService.deleteComment(req.params.id, req.user);
        res.status(200).json({ success: true, message: "Comment deleted Successfully" });
    });
}

module.exports = CommentController;