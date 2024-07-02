import express from 'express'
const router=express.Router();
import userRoute from './userRoute.js'
const baseURL="api/v1"
import authRoute from './auth.Routes.js'
import postRoute from './post.Routes.js'
import adminRoute from './adminroute.js'

router.use(`/${baseURL}/users`,userRoute)
router.use(`/${baseURL}/auth`,authRoute)
router.use(`/${baseURL}/posts`,postRoute)
router.use(`/${baseURL}/admin`,adminRoute)


export default router;