import express, { Router } from 'express';
import Container from 'typedi';
import { auth } from '../middleware/auth';
import UserController from './user.controller';

function routes() {
	const router: Router = express.Router();
	const controller = new UserController();

	router.post(`/signup`, controller.signup);

	router.post(`/login`, controller.login);

	router.put(`/user/update/:id`, auth, controller.update);

	router.get(`/user/:id`, auth, controller.getUser);

	router.get(`/decode-token`, auth, controller.decodeToken);

	return router;
}

export default routes;
