const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(express.json());


app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    origin: 'http://localhost:3002', // Allow only this origin
}));

app.get('/long-request-1', (req, res) => {
    setTimeout(() => {
        res.json({ message: 'Long request 1 complete' });
    }, 4000); // 5 seconds delay
});

app.get('/long-request-2', (req, res) => {
    setTimeout(() => {
        res.json({ message: 'Long request 2 complete' });
    }, 5500); // 10 seconds delay
});

app.get('/long-request-3', (req, res) => {
    setTimeout(() => {
        res.json({ message: 'Long request 3 complete' });
    }, 5500); // 15 seconds delay
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
