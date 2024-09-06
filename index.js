const express = require('express');
const app = express();
require('dotenv').config();
const authRouter = require('./routes/authRouter');
require('./models/dbConnection');

const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 8080;
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/auth', authRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
