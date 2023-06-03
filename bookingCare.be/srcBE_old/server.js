import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './route/appRoutes';
import 'dotenv/config';
import connectDB from './config/connectDB';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import initGgRoutes from './route/ggRoutes';
// import initfbRoute from './route/fbRoutes';

//config app
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
configViewEngine(app);

app.use(
 session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
 }),
);

// initGgRoutes(app);
// initfbRoute(app);
initWebRoutes(app);

connectDB();

const port = process.env.PORT || 8888;
app.listen(port, () => {
 console.log(`Backend nodeJs (v18.12.1) on the port - http://localhost:${port} `);
});
