import { useContext } from "react";
import CartContext from "../../context/CartContext";

import CartItem from "../CartItem";

const CartListView = () => {
  const { cartList } = useContext(CartContext);

  return (
    <ul className="pl-0">
      {cartList.map((eachCartItem) => (
        <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
      ))}
    </ul>
  );
};

export default CartListView;
