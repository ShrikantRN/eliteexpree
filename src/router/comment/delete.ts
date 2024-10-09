import { Router, Request, Response, NextFunction } from "express";

import Comment from "../../models/comment";
import Post from "../../models/posts";

const router = Router();

router.delete('/api/delete/:commentId/comment/:postId', async (req: Request, res: Response, next: NextFunction) => {
  const { commentId, postId } = req.params;

  if (!commentId || !postId ) {
    const error = new Error('Post Id and Comment Id is required to delete Comment') as CustomError
    error.status = 400
    next(error);
  }
  try {
    await Comment.findOneAndDelete({ _id: commentId })
  } catch (err) {

    const error = new Error('Cannot delete the Post') as CustomError
    error.status = 400
    next(error)
  }

  await Post.findByIdAndUpdate(
    { _id: postId },
    { $pull: { comments: commentId }}
  )

  res.status(200).json({ sucess: true })
})

export { router as deletecommentRouter}
