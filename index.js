const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
const port = 3000;
const { getClient } = require("./db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async function (req, res) {
  try {
    const { username, password } = req.body;
    const client = await getClient();
    const signupQuery = `insert into users(username , password) values('${username}', '${password}')`;
    await client.query(signupQuery);
    res.json({ message: "Signup successful" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const loginQuery = `select * from users where username = '${username}' and password = '${password}'`;
    const client = await getClient();
    const result = await client.query(loginQuery);
    if (result.rowCount === 0) {
      res.json({ message: "Login failed" });
    } else {
      res.json({ message: "Login successful" });
    }
  } catch (error) {
    console.lgo;
    res.json({ message: "Internal Server Error" });
  }
});

app.post("/addProduct", async (req, res) => {
  try {
    const { id, name, price, description, img } = req.body;
    const addProductQuery = `insert into products(id, name, price, description, img) values('${id}', '${name}', '${price}', '${description}', '${img}')`;
    const client = await getClient();
    await client.query(addProductQuery);
    res.send("Product added successfully");
  } catch (error) {
    console.log(error);
    res.send("Something went wrong - product not added");
  }
});

app.get("/getProducts", async (req, res) => {
  try {
    const getProductsQuery = `select * from products`;
    const client = await getClient();
    const result = await client.query(getProductsQuery);
    res.send(result.rows);
  } catch (error) {
    res.send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
