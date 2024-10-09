import { Router, Request, Response, NextFunction } from 'express'
import Comment from '../../models/comment';
import Post from '../../models/posts';


const router = Router()

router.post('/api/comment/new/:postId', async (req: Request, res: Response, next: NextFunction) => {
  const { userName, content } = req.body;
  const { postId } = req.params;

  if (!content) {
    const error = new Error('Comment Message are required!') as CustomError
    error.status = 400;
    return next(error)
  }

  const newComment = new Comment({
    userName: userName ? userName : 'anonymous',
    content
  })

  await newComment.save()

  const updatedPost = await Post.findByIdAndUpdate(
    { _id: postId },
    { $push: { comments: newComment } },
    { new: true }

  )
  res.status(201).send(updatedPost)

})

export { router as newCommentRouter}
