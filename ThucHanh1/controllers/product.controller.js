var db = require('../db.js');

module.exports.listProduct = (req, res)=>{
    var page = parseInt(req.query.page) || 1;//n
    var perPage = 8;//x

    var start = (page-1) * perPage;
    var end = page * perPage;
    res.render('products/index',{
        products: db.get('products').value()
    })
}