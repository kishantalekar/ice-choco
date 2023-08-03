const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
const { formatOrderDetails } = require("./utils");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/order-details", (req, res) => {
  const { order } = req.body;

  const client = require("twilio")(
    process.env.ACCOUNTSID,
    process.env.AUTHTOKEN
  );

  client.messages
    .create({
      body: formatOrderDetails(order),
      from: "whatsapp:+14155238886",
      to: "whatsapp:+919353167354",
    })
    .then((message) => console.log(message.sid));

  res.status(200).send("Order fetched successfully");
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
