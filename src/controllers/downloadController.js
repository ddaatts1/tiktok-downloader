const axios = require('axios');
const {downloadTikTokVideo} = require("../services/DownloadTiktok");
// Add additional logic for handling the download

exports.downloadVideo = async (req, res) => {
    const { videoUrl } = req.body;

    try {
        // Logic to fetch and download the TikTok video
        // Process and return the video
        // res.status(200).send('Video downloaded successfully');
      await  downloadTikTokVideo(videoUrl)
    } catch (error) {
        console.error('Error downloading video:', error);
        // res.status(500).send('Failed to download video');
    }
};
