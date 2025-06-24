import 'dotenv/config';
import express from 'express';
import path from 'path';
import url from 'url';

import { indexRouter } from './routes/indexRouter.js';

const PORT = process.env.PORT || 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
