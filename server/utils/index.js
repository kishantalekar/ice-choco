function formatOrderDetails(orderData) {
  const { userId, items, time, name, email, totalPrice, address } = orderData;

  let formattedItems = items
    .map((item) => `Product ID: ${item.productId}, Quantity: ${item.quantity}`)
    .join("\n");

  let formattedOrder = `Order from user ID ${userId}:
- Time: ${time}
- Name: ${name || "Kishan"}
- Email: ${email}
- Address: ${address || "not available"}
- Items:\n${formattedItems}
- Total Price: ${totalPrice}`;

  return formattedOrder;
}

module.exports = { formatOrderDetails };
