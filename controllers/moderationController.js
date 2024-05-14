import { fetchContent, moderateContent } from '../services/fetchService.js';
import Content from '../models/contentModel.js';

const getModeratedContent = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Content.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });

        res.json({
            page,
            limit,
            total: count,
            results: rows,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const startModeration = async (req, res) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    try {
        await fetchContent(token);
        res.status(200).send('Content moderation initiated');
    } catch (error) {
        res.status(500).send('Error initiating content moderation');
    }
};

const uploadJson = async (req, res) => {
    const contentArray = req.body;

    if (!Array.isArray(contentArray)) {
        res.status(400).json({ message: 'Invalid JSON format. Expected an array of objects.' });
        return;
    }

    try {
        for (const content of contentArray) {
            if (!content.streamerId || !content.url) {
                res.status(400).json({ message: 'Invalid JSON object format. Each object must contain streamerId, and url.' });
                return;
            }

            const moderationResult = await moderateContent(content);
            await Content.create({
                streamerId: content.streamerId,
                contentUrl: content.url,
                status: moderationResult.status,
                reason: moderationResult.reason,
                type: content.url.endsWith('.mp4') ? 'video' : 'image',
            });
        }
        res.status(200).send('JSON content processed and moderation initiated');
    } catch (error) {
        console.error('Error processing JSON content:', error);
        res.status(500).json({ message: 'Error processing JSON content', error: error.message });
    }
};

export default { getModeratedContent, startModeration, uploadJson };
