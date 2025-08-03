const ErrorResponse = require("../Utils/errorResponse");

class CommentService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }

    async createComment(data) {
        return await this.commentRepository.create(data);
    }

    async getAllComments() {
        return this.commentRepository.findAll({}, { populate: ["user", "postId"] });
    }

    async getCommentById(id) {
        const comment = await this.commentRepository.findById(id, {
            populate: ['user', 'postId'],
        });
        if (!comment) throw new ErrorResponse("Comment not found", 404);
        return comment;
    }

    async updateComment(commentId, data, user) {
        const comment = await this.commentRepository.findById(commentId);
        if(!comment) throw new ErrorResponse("Comment not found", 404);

        if(comment.user.toString() !== user._id.toString() && user.role !== 'admin'){
            throw new ErrorResponse("Not authorized to update this comment", 403);
        }

        return this.commentRepository.update(commentId, data);
    }

    async deleteComment(commentId, user) {
        const comment = await this.commentRepository.findById(commentId);
        if (!comment) throw new ErrorResponse("Comment not found", 404);

        const isOwner = comment.user.toString() === user.id;
        const isAdmin = user.role === "admin";

        if (!isOwner && !isAdmin) throw new ErrorResponse("Not authorized to delete this comment", 403);

        await this.commentRepository.delete(commentId);
    }
}

module.exports = CommentService;