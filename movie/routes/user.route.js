const {config}= require("dotenv")
const {Router}=require("express")
require("dotenv").config()
const {Home, signup, login, remove, userdata, newmovie, updatemovie, deletedmovie, ratingmovie, filtermovie, comment} = require("../controllers/user.controllers")
const middleware = require("../middlewares/user.middleware")
const router = Router()

router.get("/",Home)

//user routes
router.post("/user/signup",signup)
router.post("/user/login", login)
router.delete("/user/delete/:id",remove)
router.get("/user/",userdata)

//movie routes
router.post("/movie/create",newmovie)
router.patch("/movie/update/:id",updatemovie)
router.delete(process.env.DELETE_ROUTE,deletedmovie)
router.patch("/movie/rating/:id",ratingmovie)
router.patch("/movie/comment/:id",comment)
router.get("/movie/filter",filtermovie)

module.exports=router