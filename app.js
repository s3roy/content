import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import rateLimit from 'express-rate-limit'; // Import express-rate-limit
import sequelize from './utils/database.js';
import moderationController from './controllers/moderationController.js';
import configController from './controllers/configController.js';
import { startCronJob } from './utils/cronJob.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Use cors middleware
app.use(express.json());

// Rate limiter middleware for /upload-json endpoint
const uploadLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 100, // 24 hours
    max: 1000, // Limit each IP to 1000 requests per windowMs
    message: "You have exceeded the 100 requests in 24 hrs limit!",
    headers: true,
});

app.get('/moderated-content', moderationController.getModeratedContent);
app.post('/moderate-content', moderationController.startModeration);
app.get('/config', configController.getConfig);
app.post('/config', configController.updateConfig);
app.post('/upload-json', uploadLimiter, moderationController.uploadJson); // Apply the rate limiter here
app.delete('/moderated-content/:id', moderationController.deleteContent);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        // startCronJob();
    });
});
