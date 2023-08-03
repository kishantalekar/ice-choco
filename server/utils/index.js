function formatOrderDetails(orderData) {
  const { userId, items, time, name, email, totalPrice } = orderData;

  let formattedItems = items
    .map((item) => `Product ID: ${item.productId}, Quantity: ${item.quantity}`)
    .join("\n");

  let formattedOrder = `Order from user ID ${userId}:
- Time: ${time}
- Name: ${name || "Kishan"}
- Email: ${email}
- Items:\n${formattedItems}
- Total Price: ${totalPrice}`;

  return formattedOrder;
}

module.exports = { formatOrderDetails };
