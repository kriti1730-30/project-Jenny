
const express = require('express');
const router = express.Router();
const { runInterpreter } = require('../services/interpreter');

router.post('/', (req, res) => {
    const code = req.body.code;
    if (!code) return res.status(400).json({ error: 'No code provided' });

    runInterpreter(code, (err, output) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ output });
    });
});

module.exports = router;
