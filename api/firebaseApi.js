import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

let userRef = collection(db, "user");
let orderRef = collection(db, "orders");
let feedbackRef = collection(db, "feedback");

export const addUserDetails = async (userDetails) => {
  try {
    const data = await addDoc(userRef, { ...userDetails });
    return true;
  } catch (error) {
    return error;
  }
};
export const getUserDetails = async (email) => {
  const userQuery = query(
    userRef,
    where("email", "==", "Kishantalekar123456@gmail.com")
  );
  let user = [];
  const userSnapshot = await getDocs(userQuery);
  userSnapshot.forEach((user) => {
    user.push({ ...user.data() });
  });
  return user;
};
export const addOrder = (orderDetails, setLoading) => {
  addDoc(orderRef, orderDetails)
    .then((docRef) => {
      setLoading(false);
      return docRef;
    })
    .catch((err) => err);
};

export const getOrders = async (emailId, setOrders) => {
  try {
    const orderQuery = query(orderRef, where("email", "==", emailId));
    const querySnapshot = await getDocs(orderQuery);

    let orders = [];
    querySnapshot.forEach((order) => {
      orders.push({ ...order.data(), id: order.id });
    });

    setOrders(orders);
  } catch (error) {
    console.log(error);
  }
};
export const addRatingToOrders = async (orderId, rating) => {
  // Construct a reference to the specific order document using the orderId
  const orderDocRef = doc(db, "orders", orderId);

  try {
    // Update the 'rating' field in the order document with the new rating value
    await updateDoc(orderDocRef, {
      rating: rating,
    });
  } catch (error) {
    console.error("Error updating rating in Firebase:", error);
  }
};

export const addFeedBack = async (feedback) => {
  try {
    const data = await addDoc(feedbackRef, {
      feedback,
    });
    return data;
  } catch (error) {
    console.log(error, "in feedback");
  }
};

export const getAllFeedbacks = async () => {
  try {
    const querySnapshot = await getDocs(feedbackRef);
    let feedbacks = [];
    querySnapshot.forEach((order) => {
      feedbacks.push({ ...order.data(), id: order.id });
    });

    return feedbacks;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async (emailId, setOrders) => {
  try {
    const querySnapshot = await getDocs(orderRef);

    let orders = [];
    querySnapshot.forEach((order) => {
      orders.push({ ...order.data(), id: order.id });
    });

    // setOrders(orders);
    return orders;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderDocRef = doc(db, "orders", orderId);
    const data = await updateDoc(orderDocRef, { status: status });
    return true;
  } catch (error) {
    console.log(error);
  }
};
