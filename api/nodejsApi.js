import axios from "axios";

export const sendOrderDetailsToNodejs = async (orderDetails) => {
  try {
    const result = await axios.post(
      "https://ice-choco.onrender.com/order-details",
      { order: orderDetails }
    );
    console.log(result.data); // Corrected to access response data
  } catch (error) {
    console.log("Error sending order details to Node.js: ", error.message);
  }
};
