import cron from 'node-cron';
import { fetchContent } from '../services/fetchService.js';

export const startCronJob = () => {
    cron.schedule('*/5 * * * * *', () => {
        if (!fetchContent.isProcessing) fetchContent(null);
    });
};
