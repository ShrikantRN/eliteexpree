import { Router, Request, Response, NextFunction } from "express";

import Post from "../../models/posts";

const router = Router();

router.get('/api/post/show/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    const allpost = await Post.find().populate('comments')
    res.status(200).send(allpost)
  }

  const postone = await Post.findOne({ _id: id }).populate('comments')

  res.status(200).send(postone)

})

export { router as showPostRouter }
