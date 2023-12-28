const express = require('express'); // import express web application
require('./db/config');             // configration file for MongoDB Connection
const User = require('./db/user');  
const Products = require('./db/Product');// mangoose model for user and product
const cors = require("cors");         // cross orient resource sharing
const jwt = require('jsonwebtoken');   // json web token library
const jwtkey = 'e-comm';               // secret key for verify jwt token
const app = express();                 // create express object

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {   // create API for user registration 
   let u = new User(req.body);                  // assing request values to user Schema object
   let result = await u.save();                 // user data insert in MangoDB Datadbase using Save method
   result = result.toObject();                  // result is converted to JavaScript object
   delete result.password;

   jwt.sign({ result }, jwtkey, { expiresIn: "1d" }, (err, token) => { // sing method  generating token with cobination of 
                                                                        //result,jwtkey secrate key with expairy
      if (err) {
         resp.send({ result: "somthing went wrong" });
      }

      resp.send({ result, auth: token });             //send token to user

   })
})

app.post("/login", async (req, resp) => {

   if (req.body.email && req.body.password) {
      let user = await User.findOne(req.body).select("-password"); // user check in db and return without password field
      if (user) {
         jwt.sign({ user }, jwtkey, { expiresIn: "1d" }, (err, token) => {
            if (err) {
               resp.send({ result: "somthing went wrong" });
            }

            resp.send({ user, auth: token });

         })
      } else {
         resp.send({ result: "no user found" })
      }
   } else {
      resp.send({ result: "no user found" })
   }
})

app.post("/add-product",verifyToken, async (req, resp) => {  // create API for add product in Database with JWT Authentication
   let product = new Products(req.body);
   let result = await product.save();
   resp.send(result);

})

app.get("/list-products", verifyToken,async (req, resp) => { // create API for fetch product list from Database with JWT Authentication
   let list_product = await Products.find();
   if (list_product) {
      resp.send(list_product);
   } else {
      resp.send({ result: "no product found", });
   }
})

app.delete("/product/:id", verifyToken, async (req, resp) => {   // create API for Delete single product from Database with JWT Authentication
   //let pro = new Products(req.params.id);

   let result = await Products.deleteOne({ _id: req.params.id });
   resp.send(result);

})
app.get("/product/:id", verifyToken, async  (req, resp) => {    // create API for fetch single product from Database with JWT Authentication
   try {                                                                //This API create for get info about selected product   
      let result = await Products.findOne({ _id: req.params.id });

      if (result) {
         resp.send(result);
      } else {
         resp.status(404).send({ result: "No product found" });
      }
   } catch (error) {
      console.error("Error fetching product:", error);
      resp.status(500).send({ error: "Internal Server Error" });
   }
})

app.put("/product/:id",verifyToken, async (req, resp) => {  // create API for updateproduct in Database with JWT Authentication
   let result = await Products.updateOne(

      { _id: req.params.id },
      {
         $set: req.body                      // $set operator is used to update with new values provide in req.body.
      });
   resp.send(result)

});

app.get("/search/:key", verifyToken, async (req, resp) => {  //// create API for updateproduct in Database with JWT Authentication
   let result = await Products.find({
      "$or": [
         { name: { $regex: req.params.key } },        //$or -- logical OR operator are check expression in collection  
         { category: { $regex: req.params.key } },    //$regex -- it allow to regular expression search
         { company: { $regex: req.params.key } }


      ]
   });
   if (result) {
      resp.send(result);
   } else {
      resp.send();
   }
})

function verifyToken(req, resp, next) {    // This function are check the JWT Token 
   let token = req.headers['authorization'];  // 
   if (token) {
       token = token.split(' ')[1];
     //console.log("middlware called", token);

        jwt.verify(token, jwtkey, (err, valid) => {
           if(err){
             resp.send({result:"please provide valid token"})
           }else{
              next();
          }
       })
   } else {
      resp.send({result:"please add token with Headers"})
   }  
}
app.listen(3000)

