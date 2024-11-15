import express from 'express';
import routes from './routes.js';
import { closeDB, initDBConnection } from './db.js';

const app = express();

app.use(express.json());
app.set('view engine', 'pug');

app.use('/', routes);

(async () => {
    await initDBConnection();
})();

process.on('SIGINT', async () => {
    await closeDB();
    process.exit(0);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

