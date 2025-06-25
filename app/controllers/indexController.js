import asyncHandler from 'express-async-handler';
import { zhCN } from 'date-fns/locale';
import { format, formatDistanceToNow } from 'date-fns';

import { db } from '../db/sql-db.js';
import { CustomNotFoundError } from '../errors/CustomNotFoundError.js';

export const getAllMessagesController = asyncHandler(async (req, res) => {
	const messages = db
		.prepare('SELECT * FROM message ORDER BY added DESC')
		.all();

	console.log(messages);

	if (!messages) {
		throw new CustomNotFoundError('Messages not found');
	}

	const formattedMessages = messages.map((msg) => ({
		...msg,
		timeAgo: formatDistanceToNow(msg.added),
	}));

	res.render('index', {
		title: 'Mini Message Board',
		messages: formattedMessages,
	});
});

export const getCreateFormController = asyncHandler(async (req, res) => {
	res.render('new', { title: 'Create a new message', error: null });
});

export const createMessageController = asyncHandler(async (req, res) => {
	const author = req.body['author'].trim();
	const message = req.body['message'].trim();

	if (!author || !message) {
		return res.render('new', {
			title: 'Create a new message',
			error: 'Please fill out both fields.',
		});
	}

	db.prepare('INSERT INTO message (user, text) VALUES (?, ?)').run(
		author,
		message
	);

	res.redirect('/');
});

export const getMessageByIdController = asyncHandler(async (req, res) => {
	const id = Number(req.params.messageId);

	const stmt = db.prepare('SELECT * FROM message WHERE id = ?');
	const message = stmt.get(id);

	if (!message) {
		throw new CustomNotFoundError('Message not found');
	}

	const formattedMessage = {
		...message,
		date: format(message.added, 'yyyy-MM-dd HH:mm'),
	};

	res.render('message', { message: formattedMessage });
});
