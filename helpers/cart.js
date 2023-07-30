import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

export const AddItemToCart = (icecream) => {
  try {
    const { _id, brand, category, image, name, price, short_description } =
      icecream;
    dispatch(
      addToCart({
        _id,
        brand,
        category,
        image,
        name,
        price,
        short_description,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
