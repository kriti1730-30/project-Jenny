
const express = require('express');
const app = express();
const executeRoute = require('./routes/execute');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/execute', executeRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
