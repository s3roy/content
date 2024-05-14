import express from 'express';
import dotenv from 'dotenv';
import sequelize from './utils/database.js';
import moderationController from './controllers/moderationController.js';
import configController from './controllers/configController.js';
import { startCronJob } from './utils/cronJob.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/moderated-content', moderationController.getModeratedContent);
app.post('/moderate-content', moderationController.startModeration);
app.get('/config', configController.getConfig);
app.post('/config', configController.updateConfig);
app.post('/upload-json', moderationController.uploadJson);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        // startCronJob();
    });
});
