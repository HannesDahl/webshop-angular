const express = require('express'),
    sqlite3 = require('sqlite3').verbose(),
    path = require('path'),
    cors = require('cors'),
    port = 3000,
    app = express();

app.use(cors());
app.use(express.json());

app.get('/products', function (req, res) {
    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.all(`SELECT * FROM products ORDER BY random() LIMIT 8`, (err, products) => {
            if (err) console.error(err.message);
            res.json(products)
        });
    });
    db.close((err) => {
        if (err) console.error(err.message);
        console.log('Closed the database connection.');
    });
});

app.get('/c/:category', function (req, res) {
    let categoryName = req.params.category;
    console.log(categoryName);

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.get(`SELECT id FROM categories WHERE name = ?`, [categoryName], (err, row) => {
            if (err) console.error(err.message)

            let categoryId = row.id;

            db.all(`SELECT * FROM products AS a, product_categories AS b WHERE b.category_id = ? AND a.id = b.product_id`, [categoryId], (err, products) => {
                if (err) console.error(err.message);
                res.json(products);
            });
            db.close((err) => {
                if (err) console.error(err.message);
                console.log('Closed the database connection.');
            });
        });
    });
});

app.get('/p/:product', function (req, res) {
    let productUrl = req.params.product;
    let productName = productUrl.replace(/_/g, " ")

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.get(`SELECT * FROM products WHERE name = ?`, [productName], (err, product) => {
            if (err) console.error(err.message);
            res.json(product);
        });
    });

    db.close((err) => {
        if (err) return console.error(err.message);
        console.log('Closed the database connection.');
    });
});

app.listen(port, () => console.log(`Webshop open on port ${port}!`));