import { Router } from 'express';
import {
	getAllMessagesController,
	getCreateFormController,
	createMessageController,
	getMessageByIdController,
} from '../controllers/indexController.js';

export const indexRouter = Router();

indexRouter.get('/', getAllMessagesController);

indexRouter.get('/messages/:messageId', getMessageByIdController);

indexRouter.get('/new', getCreateFormController);

indexRouter.post('/new', createMessageController);
