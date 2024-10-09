import { Router, Request, Response, NextFunction } from "express";

import Post from "../../models/posts";

const router = Router();

router.delete('/api/delete/post/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    const error = new Error('Id is required to delete post') as CustomError
    error.status = 400
    next(error);
  }
  try {
    await Post.findOneAndDelete({_id: id})
  } catch (err) {

    const error = new Error('Cannot delete the Post') as CustomError
    error.status = 400
    next(error)
  }

  res.status(200).json({ sucess: true })
})

export { router as deletePostRouter}
