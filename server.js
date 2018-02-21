const express = require('express');
const app = express();
const db = require('./db');
const port = process.env.PORT || 3000;
const nunjucks = require('nunjucks');
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure({ noCache: true })
app.use((req, res, next) => {
    res.locals.path = req.url;
    next();
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.use('/', require('./routes'));

db.sync()
    .then(() => {
        db.seed()
    })

module.exports = app;