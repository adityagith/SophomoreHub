const express = require('express');

//Import controllers over here

const {showProducts, showCart,test,tests,registerNewProduct} = require('../controllers/shopController');
const {addToCart,getCart,getCartCount} = require('../controllers/cartController');

//Importing router 

const shopRouter = express.Router();

//Defining Routes

//To get all the products
shopRouter.get('/showproducts', showProducts);
//To Register new Product
shopRouter.post('/registerNewProduct', registerNewProduct);
//To add Product to Cart
shopRouter.post('/addtoCart', addToCart);
//To get the Cart of User
shopRouter.get('/getCart',getCart);
//To get count of cart documents
shopRouter.get('/getCartCount',getCartCount);

// shopRouter.get('/test', test);
// shopRouter.get('/show', tests);
// shopRouter.post('/showcart', showCart);

module.exports = shopRouter;