const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Cho phép CORS để truy cập từ các domain khác

app.get("/api", async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Missing URL parameter" });
    }

    try {
        const response = await axios.get(url, { timeout: 10000 });
        res.json({ data: response.data });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
