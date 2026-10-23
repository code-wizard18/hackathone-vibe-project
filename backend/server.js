const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Backend Server Ekdum Mast Chal Raha Hai!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});