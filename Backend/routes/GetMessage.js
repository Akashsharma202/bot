const express = require('express');
const router = express.Router();
const UserData = require('../models/userData');

router.get('/', async (req, res) => {
    try {
        const username = req.query.username;
        console.log("Username:", username);
        const result = await UserData.find({ username:username });
        console.log("Result:", result);

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
