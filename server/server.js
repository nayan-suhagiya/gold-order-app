const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(
  "sk_test_51MEUprSB4EBQaMcWE1ZLkvfXNkvnfFCWntMjALBb13KczmT3ln1PRNBO5gn5IfwlURcumUQBztZUXMwzICfWVdyt00Bl9m1XXf"
);

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.odata.map((data) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Order Payment",
          },
          unit_amount: data.price * 100,
        },
        quantity: data.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cancel.html",
    });

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

app.listen(4242, () => console.log("App is running on 4242"));
