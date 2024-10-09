import { Router, Request, Response, NextFunction } from "express"

import post from '../../models/posts'

const router = Router()

router.post('/api/post/update/:id', async (req: Request, res: Response, next: NextFunction) => {

  const { id } = req.params;

  const { title, content } = req.body;

  if (!id) {
    const error = new Error('Id is required!') as CustomError
    error.status = 400
    next(error);
  }
  let updatepost;
  try {
    updatepost = await post.findByIdAndUpdate(
      { _id: id },
      { $set: { content, title } },
      { new: true }
    )
  } catch (err) {
    const error = new Error('Post Not Updated') as CustomError
    error.status = 400;
    next(error);
  }

  res.status(200).send(updatepost)
})

export {router as updatePostRouter}
