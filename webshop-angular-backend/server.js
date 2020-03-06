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

app.get('/categoryprice/:category', function (req, res) {
    let categoryName = req.params.category;

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.get(`SELECT id FROM categories WHERE name = ?`, [categoryName], (err, row) => {
            if (err) console.error(err.message)

            let categoryId = row.id;
            let sqlCode = `SELECT price FROM products AS a, product_categories AS b WHERE b.category_id = ? AND a.id = b.product_id`;

            db.all(sqlCode, [categoryId], (err, productsprices) => {
                if (err) console.error(err.message);
                res.json(productsprices);
            });
            db.close((err) => {
                if (err) console.error(err.message);
                console.log('Closed the database connection.');
            });
        });
    });
})

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
                if (req.query.pr) {
                    let arr = req.query.pr.split('-');
                    let firstValue = arr[0];
                    let secondValue = arr[1];

                    sqlCode += ` AND price BETWEEN ${firstValue} and ${secondValue}`
                }

                if (req.query.s) {
                    sqlCode += ` AND name LIKE '%${req.query.s}%'`
                }

                if (req.query.ob) {
                    switch (req.query.ob) {
                        case 'asc':
                            sqlCode += ' ORDER BY price ASC';
                            break;
                        case 'desc':
                            sqlCode += ' ORDER BY price DESC';
                            break;
                        case 'A-Z':
                            sqlCode += ' ORDER BY name ASC';
                            break;
                        case 'Z-A':
                            sqlCode += ' ORDER BY name DESC';
                    }
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

app.get('/categories', function (req, res) {
    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database.');
    });

    db.serialize(() => {
        db.all(`SELECT * FROM categories`, (err, categories) => {
            if (err) console.error(err.message);
            res.json(categories);
        });
    });
    db.close((err) => {
        if (err) console.error(err.message);
        console.log('Closed the database connection.');
    });
});

app.post('/addproduct', function (req, res) {
    console.log(req.body);

    let db = new sqlite3.Database('products.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the products database');
    });
    let productvals = [req.body.name, req.body.name.replace(/\s+/g, '-'), JSON.parse(req.body.price), req.body.description, req.body.imageName];
    db.serialize(() => {
        db.run(`INSERT INTO products (name, url, price, description, image) VALUES(?, ?, ?, ?, ?)`, productvals, function (err) {
            if (err) console.error(err);

            let categories = req.body.categories
            for (let i = 0; i < categories.length; i++) {
                db.run(`INSERT INTO product_categories (product_id, category_id) VALUES(?, ?)`, [this.lastID, categories[i]], function (err) {
                    if (err) console.error(err.message);
                    console.log(`A row has inserted with rowid ${this.lastID}`);
                });
            }
        });
    });
});

app.listen(port, () => console.log(`Webshop open on port ${port}!`));