import express from 'express';

import authRoutes from './auth/routes';
import usersRoutes from './users/routes';

export const services = express.Router();
services.use('/auth', authRoutes);
services.use('/users', usersRoutes);