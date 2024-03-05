import express from 'express';
import { router } from './router.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
