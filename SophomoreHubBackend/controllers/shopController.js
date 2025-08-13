const Product = require('../models/shopProductModel');
const Cart = require("../models/shopCartModel");
const cors = require("cors");
const bodyParser = require('body-parser');
const randomstring = require("randomstring");//For creating unique Product ID

//Internal Functions for userConnectsController
function countObject(object)
{
    let count = 0;
    for (const value of Object.values(object)) {
        count++;
    }
    return count;
}

//Display the available products
exports.showProducts = async (req, res) => {
  try {
      //Gets the Name-Value Pair from the GET Request by React
      let queryFromGetRequest = req.query;
      let products;
      if((countObject(queryFromGetRequest))==0)
        {
          products = await Product.find({});
        }
        else
        {
            //Mongoose Query, If Parameters are passed domain and price
            //Modify later for search
            products = await Product.find({"domain":queryFromGetRequest['domain'],price: { $lt: queryFromGetRequest['price'] }});
        }
      //const sessionData = req.session;
      req.session.isLoggedIn = true;  // Set session
      console.log(req.session.userid);
      res.status(200).json({products});
    } catch (error) {
      res.status(201).json({ message: 'Not registerd :(' });
    }
};

//Display the cart
exports.showCart = async(req,res) =>{
  try {
    let userCart;
    userCart = await Product.find({});
    res.status(200).json({userCart});
  } catch (error) {
    res.status(201).json({ message: 'Not registerd :(' });
  }
}


//Register new Product
exports.registerNewProduct= async(req,res) =>{
  try {
    let newProduct;
    const{ product,description,price,domain } = req.body;
    const sessionData = req.session;
    req.session.isLoggedIn = true;
    let productId=randomstring.generate(6);
    productId = productId.concat(product);
    newProduct = new Product({productid:productId,name:product,desc:description,domain:domain,price:price,imagepath:productId.concat("sds.jpeg"),userid:req.session.userid});
    newProduct.save();
    res.status(201).json({error: '0'});
  } catch (error) {
    res.status(501).json({error: '500'});
  }
}

//test 
exports.test = async(req,res) =>{
  try {
    let Products;
    Products = await Product.find({price: { $gt: 100, $lt: 700 }});
    const sessionData = req.session;
        req.session.isLoggedIn = true;  // Set session
        console.log(req.session.userid);
        res.status(201).json({ message: 'success!' });
    res.status(200).json({Products});
  } catch (error) {
    res.status(201).json({ message: 'Not registerd :(' });
  }
}

exports.tests = async(req,res) =>{
  try {
        const sessionData = req.session;
        req.session.isLoggedIn = true;  // Set session
        console.log(req.session.userid);
        res.status(201).json({ message: 'success!' });
  } catch (error) {
    res.status(401).json({ message: 'Not registerd :(' });
  }
}