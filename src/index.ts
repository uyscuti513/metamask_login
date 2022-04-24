import cors from 'cors';
import express from 'express';
import { services } from './services';

const app = express();

// Initialize
import './db';

// Middlewares
app.use(express.json());
app.use(cors());

app.use('/api', services);

const port = process.env.PORT || 3000;

app.listen(port, () =>
	console.log(`Server listening on localhost:${port}`)
);
