/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'express-async-errors';
import { errors } from 'celebrate';
import { Server } from 'socket.io';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';
// import rateLimiter from './middlewares/rateLimiter';
// import upload from '@config/upload';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

// Não inserir URL de acesso prioritario
// console.log('API CHEGOU NO CORS');
// app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));

app.use(
  cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders(res: any, path: string, stat: any) {
    res.set('x-timestamp', Date.now());
  },
};

app.use(
  '/processes/file',
  express.static(`${uploadConfig.tmpFolder}/processes/file`, options),
);
app.use(express.json());

// app.use('/image', express.static(`${upload.tmpFolder}/car/image`));
// app.use('/document', express.static(`${upload.tmpFolder}/car/document`));
// app.use(rateLimiter);
app.use(routes);
app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export { serverHttp, io };
