
import * as dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import {
  newPostRouter,
  deletePostRouter,
  showPostRouter,
  updatePostRouter,
  showallPostRouter,
  newCommentRouter,
  deletecommentRouter
} from './router'

import mongoose from 'mongoose'

const app = express()

app.use(urlencoded({
  extended: false
}))
app.use(json())

app.use(cors(
  {
    origin: '*',
    optionsSuccessStatus: 200
  }
))
app.use(newPostRouter)
app.use(deletePostRouter)
app.use(showPostRouter)
app.use(updatePostRouter)
app.use(showallPostRouter)


app.use(newCommentRouter)
app.use(deletecommentRouter)

app.use('*', (req, res, next) => {

  const error = new Error('Not Found') as CustomError;
  error.status = 404;
  next(error);

})

declare global  {
  interface CustomError extends Error{
    status?: number
  }
}

// Error-handling middleware must be placed after all routes and other middleware
// app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {

//   if (error.status) {
//     return res.status(error.status).json({ message: error.message });
//   }
//   res.status(500).json({ message: 'Something went wrong!' });

// });
const ErrorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: 'Something went wrong!' });
};
const start = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not configured in .env file')

  try {
    await mongoose.connect(process.env.MONGO_URI)
  } catch (error) {
    throw new Error ('Mongo db not connect..')
  }

  app.listen('8087', () => console.log('Server is up and running on 8087 port.'))

}

  start()
  export default ErrorHandler
//to create a server


