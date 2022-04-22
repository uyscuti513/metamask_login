import './db';
import cors from 'cors';
import express from 'express';

//import { services } from './services';
// set strictPropertyInitialization false
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Mount REST on /api
//app.use('/api', services);

const port = process.env.PORT || 8000;

app.listen(port, () =>
	console.log(`Server listening on localhost:${port}`)
);
