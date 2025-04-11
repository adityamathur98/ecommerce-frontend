import { useContext } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsDashSquare, BsPlusSquare } from "react-icons/bs";
import CartContext from "../../context/CartContext";

const CartItem = (props) => {
  const { cartItemDetails } = props;
  const { id, title, brand, quantity, price, imageUrl } = cartItemDetails;

  const {
    deleteCartItem,
    decrementCartItemQuantity,
    incrementCartItemQuantity,
  } = useContext(CartContext);

  return (
    <li className="flex items-center bg-[#ffffff] p-[16px] mb-[16px] shadow-[0px_4px_16px_0px_#7e858e29] md:mb-[32px] md:pl-[36px] md:py-[24px] md:mr-[48px]">
      <img
        src={imageUrl}
        alt={title}
        className="w-[96px] h-[96px] rounded-[4px] "
      />
      <div className="ml-[16px] md:flex md:justify-between md:flex-grow ">
        <div className="md:min-w-[250px]">
          <p className="md:text-[16px]">{title}</p>
          <p className="text-[#64748b] font-roboto text-[10px] md:text-[12px]">
            by {brand}
          </p>
        </div>
        <div className="flex items-center">
          <button type="button" className="p-0">
            <BsDashSquare
              color="#52606d"
              size={12}
              onClick={() => decrementCartItemQuantity(id)}
              className="cursor-pointer"
            />
          </button>
          <p className="text-[#52606d] font-roboto text-[12px] font-[500] m-[8px] leading-[1.3] md:text-[18px] md:mx-[16px]">
            {quantity}
          </p>
          <button type="button" className="p-0">
            <BsPlusSquare
              color="#52606d"
              size={12}
              onClick={() => incrementCartItemQuantity(id)}
              className="cursor-pointer"
            />
          </button>
        </div>
        <div className="flex items-center">
          <p className="text-[#0b69ff] font-roboto text-[16px] font-[500] my-0 min-w-[100px] md:text-[18px]">
            Rs {price * quantity}/-
          </p>
          <button
            type="button"
            className="bg-transparent text-[#334155] font-roboto text-[10px] leading-[16px] border-none outline-none cursor-pointer md:hidden"
            onClick={() => {
              deleteCartItem(id);
            }}>
            Remove
          </button>
        </div>
      </div>
      <button
        type="button"
        className="bg-transparent border-none outline-none cursor-pointer ml-[32px] hidden md:inline"
        onClick={() => {
          deleteCartItem(id);
        }}>
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  );
};

export default CartItem;
