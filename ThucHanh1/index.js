require('dotenv').config();
console.log(process.env.SESSION_SECRET);
const express = require('express')
var cookieParser = require('cookie-parser')
const app = express()
const port = 3000
var authMiddleware = require('./middlewares/auth.middlewares');
var userRoute = require('./routes/user.route');
var login = require('./routes/login.route');
var product = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRouter = require('./routes/transfer.route');
var sessionMiddleware = require("./middlewares/session.middleware");
var csurf = require('csurf');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('ssfdfsdsd'))
app.use(sessionMiddleware)
app.use(csurf({ cookie: true}));
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public')); 

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/login', login);
app.use('/products', product);
app.use('/cart',cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})