import 'express-async-errors'
import express from 'express';
import cors from 'cors';
import http from 'http';
const apiSeed = '/api/v1'
import appRoute from './routes/index'
const app = express();

app.use(cors());

app.use(`${apiSeed}/`, appRoute);

const server = http.createServer(app);

server.listen(8088, () => {
  console.log('Server listening on port 8088');
}); 


export { app };