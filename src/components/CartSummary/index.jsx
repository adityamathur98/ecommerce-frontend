import { useContext } from "react";
import CartContext from "../../context/CartContext";

const CartSummary = () => {
  const { cartList } = useContext(CartContext);

  let total = 0;
  cartList.forEach(
    (eachCartItem) => (total += eachCartItem.price * eachCartItem.quantity)
  );

  return (
    <>
      <div className="flex flex-col self-end">
        <h1 className="text-[#171f46] font-roboto text-[16px] mb-[2px] md:text-[32px]">
          <span className="text-[#616e7c] font-roboto text-[16px] font-[500] md:text-[24px]">
            Order Total:
          </span>{" "}
          Rs {total}/-
        </h1>
        <p className="text-[#616e7c] font-roboto text-[12px] mt-[2px] md:text-[16px]">
          {cartList.length} Item in Cart
        </p>
        <button
          type="button"
          className="bg-[#0b69ff] text-[#ffffff] font-roboto text-xs border-none rounded px-4 py-3 mt-2 outline-none cursor-pointer hidden md:block">
          Checkout
        </button>
      </div>
      <button
        type="button"
        className="bg-[#0b69ff] text-[#ffffff] font-roboto text-xs border-none rounded px-4 py-3 mt-2 outline-none cursor-pointer block md:hidden">
        Checkout
      </button>
    </>
  );
};

export default CartSummary;
