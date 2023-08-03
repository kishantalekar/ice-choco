import axios from "axios";

export const sendOrderDetailsToNodejs = async (orderDetails) => {
  try {
    const result = await axios.post(
      "https://a179-2409-408c-be0e-db5-dc0d-7f3b-1d2e-8fc6.ngrok.io/order-details",
      { order: orderDetails }
    );
    console.log(result.data); // Corrected to access response data
  } catch (error) {
    console.log("Error sending order details to Node.js: ", error.message);
  }
};
