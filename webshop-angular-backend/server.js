const express = require('express'),
    sqlite3 = require('sqlite3').verbose(),
    path = require('path'),
    cors = require('cors'),
    port = 3000,
    app = express();

app.use(cors());
app.use(express.json());

app.get('/frontproducts', function (req, res) {
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

app.get('/randomproducts', function (req, res) {
    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.all(`SELECT * FROM products ORDER BY random() LIMIT 4`, (err, products) => {
            if (err) console.error(err.message);
            res.json(products);
        });
    });
    db.close((err) => {
        if (err) console.error(err.message);
        console.log('Closed the database connection.');
    });
});

app.get('/category/:category', function (req, res) {
    let categoryName = req.params.category;

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.get(`SELECT id FROM categories WHERE name = ?`, [categoryName], (err, row) => {
            if (err) console.error(err.message)

            let categoryId = row.id;
            let sqlCode = `SELECT * FROM products AS a, product_categories AS b WHERE b.category_id = ? AND a.id = b.product_id`;

            if (req.query) {
                if (req.query.pb == 'asc') {
                    sqlCode += ` ORDER BY price ASC`;
                } else if (req.query.pb == 'desc') {
                    sqlCode += ` ORDER BY price DESC`;
                } else if (req.query.ob == 'A-Z') {
                    sqlCode += ` ORDER BY name ASC`;
                } else if (req.query.ob == 'Z-A') {
                    sqlCode += ` ORDER BY name DESC`;
                }
            }

            db.all(sqlCode, [categoryId], (err, products) => {
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

app.get('/product/:product', function (req, res) {
    let productUrl = req.params.product;

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.get(`SELECT * FROM products WHERE url = ?`, [productUrl], (err, product) => {
            if (err) console.error(err.message);
            res.json(product);
        });
    });

    db.close((err) => {
        if (err) return console.error(err.message);
        console.log('Closed the database connection.');
    });
});

app.get('/search/:searchvalue', function (req, res) {
    let searchValue = req.params.searchvalue;

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.all(`SELECT * FROM products WHERE name LIKE '%${searchValue}%'`, (err, products) => {
            if (err) console.error(err);
            res.json(products);
        });
    });

    db.close((err) => {
        if (err) return console.error(err.message);
        console.log('Closed the database connection.');
    });
});

app.listen(port, () => console.log(`Webshop open on port ${port}!`));