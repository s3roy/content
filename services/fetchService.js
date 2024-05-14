import axios from 'axios';
import { moderateImage, moderateVideo } from './rekognitionService.js';
import Config from '../models/configModel.js';
import Content from '../models/contentModel.js';

let lastId = 0;
export let isProcessing = false;

const fetchContent = async (token) => {
    if (isProcessing) return;
    isProcessing = true;
    try {
        const config = await Config.findOne();
        const fetchApi = config.fetchApi;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${fetchApi}?lastId=${lastId}`, { headers });
        const content = response.data;

        if (content.length > 0) {
            for (const item of content) {
                const moderationResult = await moderateContent(item);
                await Content.create({
                    id: item.id,
                    streamerId: item.streamerId,
                    contentUrl: item.url,
                    status: moderationResult.status,
                    reason: moderationResult.reason,
                    type: item.url.endsWith('.mp4') ? 'video' : 'image',
                });
            }
            lastId = content[content.length - 1].id;
        }
    } catch (error) {
        console.error('Error fetching content:', error);
    }
    isProcessing = false;
};

const moderateContent = async (content) => {
    if (content.url.endsWith('.mp4')) {
        return moderateVideo(content);
    } else {
        return moderateImage(content);
    }
};

export { fetchContent, moderateContent };
