import AWS from 'aws-sdk';
import axios from 'axios';

const rekognition = new AWS.Rekognition({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const moderateImage = async (image) => {
    console.log('Starting image moderation for:', image.url);
    try {
        const response = await axios.get(image.url, {
            responseType: 'arraybuffer',
            timeout: 5000, // 5 seconds timeout
        });
        console.log('Image fetched successfully:', image.url);

        const params = {
            Image: {
                Bytes: response.data,
            },
        };

        const result = await rekognition.detectModerationLabels(params).promise();
        console.log('Moderation result:', result);

        const hasInappropriateContent = result.ModerationLabels.length > 0;
        const labels = result.ModerationLabels.map(label => label.Name).join(', ');

        return {
            status: hasInappropriateContent ? 'Rejected' : 'Accepted',
            reason: hasInappropriateContent ? labels : '',
        };
    } catch (error) {
        console.error('Error moderating image:', error.message);
        return { status: 'Error', reason: error.message };
    }
};

const moderateVideo = async (video) => {
    // Placeholder for video moderation logic using Rekognition Video
    return { status: 'Accepted', reason: '' };
};

export { moderateImage, moderateVideo };
