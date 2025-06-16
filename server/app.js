// import express, { urlencoded } from 'express'
// import { config } from 'dotenv'
// import cookieParser from 'cookie-parser'
// import cors from 'cors'
// import { connectDB } from './database/db.js'
// import { errorMiddleware } from './middlewares/errorMiddlewares.js'
// import authRouter from './routes/authRouter.js'
// import bookRouter from './routes/bookRouter.js'
// import borrowRouter from './routes/borrowRouter.js'
// import userRouter from './routes/userRouter.js'
// import expressFileupload from 'express-fileupload'
// import { notifyUsers } from './services/notifyUsers.js'
// import { removeUnverifiedAccounts } from './services/removeUnverifiedAccount.js'


// export const app=express()

// config({path:"./config/config.env"})

// app.use(cors({
//     origin:process.env.FRONTEND_URL,
//     methods:["GET","POST","PUT","DELETE"],
//     credentials:true,
// }))


// app.use(cookieParser())
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

// app.use(expressFileupload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));

// app.use("/api/v1/auth",authRouter)
// app.use("/api/v1/book",bookRouter)
// app.use("/api/v1/borrow",borrowRouter)
// app.use('/api/v1/user',userRouter)
// notifyUsers()
// removeUnverifiedAccounts()


// connectDB()
 
// app.use(errorMiddleware)




import express, { urlencoded } from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './database/db.js';
import { errorMiddleware } from './middlewares/errorMiddlewares.js';
import authRouter from './routes/authRouter.js';
import bookRouter from './routes/bookRouter.js';
import borrowRouter from './routes/borrowRouter.js';
import userRouter from './routes/userRouter.js';
import expressFileupload from 'express-fileupload';
import { notifyUsers } from './services/notifyUsers.js';
import { removeUnverifiedAccounts } from './services/removeUnverifiedAccount.js';

// Load environment variables
config({ path: './config/config.env' });

export const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const FRONTEND_URL = isProduction ? process.env.PROD_FRONTEND_URL : process.env.DEV_FRONTEND_URL;
const MONGO_URI = isProduction ? process.env.PROD_MONGO_URI : process.env.DEV_MONGO_URI;

// app.use(cors({
//   origin: FRONTEND_URL,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));

app.use(cors({
  origin: function (origin, callback) {
    console.log("Incoming origin:", origin);
    if (!origin || origin === FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
console.log(FRONTEND_URL)

app.get('/', (req, res) => {
  res.send('Library Backend is running successfully!');
});

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("FRONTEND_URL:", FRONTEND_URL);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressFileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/book', bookRouter);
app.use('/api/v1/borrow', borrowRouter);
app.use('/api/v1/user', userRouter);


notifyUsers();
removeUnverifiedAccounts();


connectDB(MONGO_URI);

app.use(errorMiddleware);