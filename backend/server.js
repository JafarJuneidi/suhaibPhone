import express from 'express';
import dotenv from 'dotenv';
// need to add .js when importing js files
import connectDB from './config/db.js';
import products from './data/products.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
});

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
