import asyncHandler from 'express-async-handler';

import { getAllMessages } from '../db.js';
import { CustomNotFoundError } from '../errors/CustomNotFoundError.js';

export const indexController = asyncHandler(async (req, res) => {
	const messages = getAllMessages();

	if (!messages) {
		throw new CustomNotFoundError('Messages not found');
	}

	res.render('index', { title: 'Mini Message Board', messages: messages });
});
