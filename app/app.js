import 'dotenv/config';
import express from 'express';
import path from 'path';
import url from 'url';

import { indexRouter } from './routes/indexRouter.js';
import { CustomNotFoundError } from './errors/CustomNotFoundError.js';

const PORT = process.env.PORT || 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

// Error handling
app.use((req, res, next) => {
	throw new CustomNotFoundError('Page Not Found');
});

app.use((err, req, res, next) => {
	console.error(err);

	const statusCode = err.statusCode || err.status || 500;
	const message = err.message || 'Internal Server Error';
	const title = statusCode === 500 ? 'Server Error' : 'Error';

	res.status(statusCode).render('error', {
		title,
		message,
		statusCode,
	});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
