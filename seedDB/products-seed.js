const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const faker = require("faker");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  faker.seed(0);

  //--------------------Mini Bags
  const womens_titles = [
    "Pink Leather Crossbody Bag",
    "Mini Black Carra Shoulder Bag",
    "Blue Jeans Mini Bag",
    "Red Be Dior Mini Bag with Crossbody Strap",
    "A set of Two Elegant Handbags",
    "Golden Leather Handbag",
    "Elegant Black Leather Handbag",
    "Gray and Yellow Flowery Shoulder Bag"
  ];

  const womens_imgs = [
    "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
    "https://p1.pxfuel.com/preview/177/215/691/handbag-bag-today-the-postwoman-fashion-style-skin.jpg",
    "https://c.pxhere.com/photos/37/cb/camera_bag_scene_package_fashion-900156.jpg!d",
    "https://c.pxhere.com/photos/92/ad/bag_dior_u-867943.jpg!d",
    "https://images.unsplash.com/photo-1564222256577-45e728f2c611?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    "https://p1.pxfuel.com/preview/550/178/484/bag-handbag-haberdashery.jpg",
    "https://c.pxhere.com/photos/4b/82/handbag_purse_fashion_bag_female_style_women_lady-703156.jpg!d",
    "https://p1.pxfuel.com/preview/843/210/542/vera-bradley-purse-handbag-shoulder-bag.jpg",
  ];

  //--------------------Large Handags

  const mens_titles = [
    "Pair of brown leather boots beside bet",
    "Timberland",
    "Pile of blue denim jeans",
    "White hotel printed Shirt"
  ];
  const mens_imgs = [
    "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1549660299-31c4ea5f34c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
  ];

  async function seedProducts(titlesArr, imgsArr, categStr) {
    try {
      const categ = await Category.findOne({ title: categStr });
      for (let i = 0; i < titlesArr.length; i++) {
        let prod = new Product({
          productCode: faker.helpers.replaceSymbolWithNumber("####-##########"),
          title: titlesArr[i],
          imagePath: imgsArr[i],
          description: faker.lorem.paragraph(),
          price: faker.random.number({ min: 10, max: 50 }),
          manufacturer: faker.company.companyName(0),
          available: true,
          category: categ._id,
        });
        await prod.save();
        console.log("SUCCESSFUL MIGRATED");
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }

  await seedProducts(womens_titles, womens_imgs, "Women");
  await seedProducts(mens_titles, mens_imgs, "Men");

  await closeDB();
}

seedDB();
