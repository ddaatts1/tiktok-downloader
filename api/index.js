// const express = require("express");
// const app = express();
//
// app.get("/", (req, res) => res.send("Express on Vercel"));
//
// app.listen(3000, () => console.log("Server ready on port 3000."));
//
// module.exports = app;



const express = require('express');
const path = require('path');
const {downloadTikTokVideo} = require("../src/services/DownloadTiktok");

const index = express();
index.use(express.urlencoded({ extended: true }));
index.use(express.static(path.join(__dirname, '..', 'public'))); // Adjust static path



// Set EJS as the templating engine
index.set('view engine', 'ejs');


// Route to render the initial form page
index.get('/', (req, res) => {
    res.redirect('/tai-video-tiktok'); // Redirect root URL to /tai-video-tiktok
});

// Define your main route
index.get('/tai-video-tiktok', (req, res) => {
    res.render('index', { title: 'Download TikTok Videos', videoData: null });
});


// Route to handle the form submission
index.post('/download', async (req, res) => {
    const { videoUrl } = req.body;

    try {
        const videoData = await downloadTikTokVideo(videoUrl);
        res.render('index', { title: 'Download TikTok Videos', videoData });
    } catch (error) {
        console.error('Error downloading video:', error);
        res.render('index', { title: 'Download TikTok Videos', videoData: { error: 'Failed to download video' } });
    }
});

index.listen(3000, () => {
    console.log('Server running on port 3000');
});
