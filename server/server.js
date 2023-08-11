const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
const { createClient } = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");
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

const sanity = createClient({
  projectId: process.env.PROJECTID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-08-12",
  token: process.env.SANITY_TOKEN,
});
const builder = imageUrlBuilder(sanity);
app.get("/get-ice-creams", async (req, res) => {
  const { query } = req.query;

  try {
    const iceCreams = await sanity.fetch(query);

    // Map ice creams and generate image URLs
    const iceCreamsWithImageUrls = iceCreams.map((iceCream) => {
      const imageUrl = builder.image(iceCream.image?.asset).url();
      return { ...iceCream, imageUrl };
    });

    res.json(iceCreamsWithImageUrls); // Send the data with image URLs in the response
  } catch (error) {
    console.error("Error fetching ice creams", error);
    res.status(500).json({ error: "Error fetching ice creams" });
  }
});
app.get("/get-featureds", async (req, res) => {
  const { query } = req.query;

  const featuredItems = await sanity.fetch(query);
  const featuredItemsWithImageUrls = featuredItems.map((featuredItem) => {
    if (featuredItem.iceCream) {
      const iceCreamsWithImageUrls = featuredItem.iceCream.map((iceCream) => {
        if (iceCream.image && iceCream.image.asset) {
          const imageUrl = builder.image(iceCream.image.asset._ref).url();
          return { ...iceCream, imageUrl: imageUrl };
        }
        return iceCream;
      });

      return { ...featuredItem, iceCream: iceCreamsWithImageUrls };
    }
    return featuredItem;
  });

  res.json(featuredItemsWithImageUrls);
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
