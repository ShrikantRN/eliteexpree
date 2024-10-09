import { Router, Request, Response, NextFunction } from "express";

import Post from "../../models/posts";

const router = Router();

router.get('/api/post/showall', async (req: Request, res: Response, next: NextFunction) => {

    const allpost = await Post.find().populate('comments')
    res.status(200).send(allpost)

})

export { router as showallPostRouter }
