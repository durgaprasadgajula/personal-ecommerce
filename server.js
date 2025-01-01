const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose(); // Import sqlite3 and use verbose mode for better error messages
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const razorpayKeyId = "rzp_test_Ex0AnmIitDbTLe";
const razorpayKeyPassword = "fyz9V9rfSqTdMYRbhRr8P2zK";

let db;
const initializeDBandServer = async () => {
  try {
    db = await open({
      filename: path.join(__dirname, "durgaTrendz.db"),
      driver: sqlite3.Database,
    });
    app.listen(8000, () => {
      console.log("Server is running on http://localhost:8000/");
    });
  } catch (error) {
    console.log(`DataBase error is ${error.message}`);
    process.exit(1);
  }
};
initializeDBandServer();

// app.post("/register", async (req, res) => {
//     const { username, password, email } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await db.run(
//             "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
//             [username, email, hashedPassword]
//         );
//         console.log("User registered successfully");
//         res.status(200).json({
//             success: true,
//             message: "User registered successfully",
//         });
//     } catch (error) {
//         console.error("Error registering user:", error.message);
//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//         });
//     }
// });

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // Check if the email already exists in the database
    const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // If the email is not found, proceed with user registration
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    console.log("User registered successfully");
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.post("/google-login", async (req, res) => {
  const { username, email } = req.body;
  console.log(username);
  try {
    const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (existingUser) {
      const payload = { email: email };
      const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
      res.send({ jwt_token: jwtToken });
    } else {
      // Insert the new user with is_google_user set to true
      await db.run(
        "INSERT INTO users (username, email, is_google_user) VALUES (?, ?, ?)",
        [username, email, 1]
      );

      const payload = { email: email };
      const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
      res.send({ jwt_token: jwtToken });
    }
  } catch (error) {
    console.error("Error during Google login:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Get single product by ID

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const selectUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
    let dbUser = await db.get(selectUserQuery);

    if (dbUser === undefined) {
      res.status(400).send("Invalid User");
      return;
    }
    const validPassword = await bcrypt.compare(password, dbUser.password);

    if (validPassword) {
      const payload = { username: username };
      const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
      res.send({ jwt_token: jwtToken });
    } else {
      res.status(400).send("Invalid Password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

const authenticationToken = (req, res, next) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];

  if (authHeader != undefined) {
    jwtToken = authHeader.split(" ")[1];
  } else {
    res.status(401);
    res.send("Invalid JWT Token");
  }

  if (jwtToken != undefined) {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (err, payload) => {
      if (err) {
        res.status(401);
        res.send("Invalid JWT Token");
      } else {
        next();
      }
    });
  }
};

app.get("/products", authenticationToken, async (req, res) => {
  const { sort_by, category, title_search, rating } = req.query;

  let sql = "SELECT * FROM Products WHERE 1=1";

  if (category) {
    const categoryOptions = [
      {
        name: "Cloth",
        categoryId: "1",
      },
      {
        name: "Electronics",
        categoryId: "2",
      },
      {
        name: "Appliances",
        categoryId: "3",
      },
      {
        name: "Grocery",
        categoryId: "4",
      },
      {
        name: "Toys",
        categoryId: "5",
      },
    ];
    const categoryName = categoryOptions.filter(
      (opt) => opt.categoryId == category
    )[0].name;

    sql += ` AND image_url LIKE '%${categoryName.toLowerCase()}%'`;
  }

  if (title_search) {
    sql += ` AND title like '%${title_search}%'`;
  }

  if (rating) {
    const floatRating = parseFloat(rating);
    sql += ` AND rating >= ${floatRating}`;
  }
  if (sort_by) {
    const sortOrder = sort_by === "PRICE_HIGH" ? "DESC" : "ASC";
    sql += ` ORDER BY price ${sortOrder}`;
  }

  let data = await db.all(sql);
  if (!data) {
    return res.status(404).send({ Message: "No products found!" });
  } else {
    res.json(data);
  }
});

app.get("/products/:id", authenticationToken, async (req, res) => {
  const { id } = req.params;
  try {
    let productQuery = `select  * from Products where id=${id};`;
    let getProduct = await db.get(productQuery);
    if (!getProduct) {
      return res.status(404).send("The requested item does not exist.");
    } else {
      res.json(getProduct);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeyPassword,
    });
    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(404).send("Error");
    }

    res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});

app.post("/order/validate-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // Verify the signature
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", razorpayKeyPassword)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Payment is valid
    res.status(200).json({
      message: "Payment validated successfully",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } else {
    // Payment is invalid
    res.status(400).json({
      message: "Payment validation failed",
    });
  }
});
