const express = require("express")
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const app = express();
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const cookieParser = require("cookie-parser");
const multer = require('multer')
const path = require('path')

dotenv.config();

//middleware
app.use(express.json());
app.use(cookieParser())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

const connect =() => {
    try {
         mongoose.connect(process.env.MONGO_URL);
        console.log("connected to database mongo")
    } catch (error) {
        throw error;
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    console.log(req.body)
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


// routes
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/posts",postsRoute);

//error handling
app.use((err,req,res,next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || "something went wrong"
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        stack:err.stack,
        message:errMessage
    })
})

app.listen(8002,()=>{
    connect()
    console.log("server is running")
});