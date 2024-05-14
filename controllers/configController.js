import Config from '../models/configModel.js';

const getConfig = async (req, res) => {
    try {
        const config = await Config.findOne();
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateConfig = async (req, res) => {
    try {
        let config = await Config.findOne();
        if (config) {
            config.fetchApi = req.body.fetchApi;
        } else {
            config = new Config({ fetchApi: req.body.fetchApi });
        }
        await config.save();
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { getConfig, updateConfig };
