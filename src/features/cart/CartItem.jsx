import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, decreaseItem, increaseItem } from "./cartSlice";
import Button from "../../ui/Button";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.cart.find((item) => item.pizzaId === pizzaId),
  );
  const cartItemQuantity = cartItem?.quantity || 0;

  return (
    <li className="group flex items-center justify-between gap-2 rounded-lg bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Pizza Bilgisi */}
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="text-base font-semibold text-gray-700 sm:text-lg">
          {quantity}&times;
        </span>
        <p className="text-sm text-gray-800 sm:text-lg">{name}</p>
      </div>

      {/* Fiyat ve Butonlar */}
      <div className="flex items-center gap-2 sm:gap-4">
        <p className="text-base font-bold text-gray-900 sm:text-lg">
          {formatCurrency(totalPrice)}
        </p>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            onClick={() => dispatch(decreaseItem(pizzaId))}
            className="px-2 py-1 text-sm sm:px-3 sm:py-2"
          >
            -
          </Button>
          <span className="text-sm font-medium sm:text-base">
            {cartItemQuantity}
          </span>
          <Button
            onClick={() => dispatch(increaseItem(pizzaId))}
            className="px-2 py-1 text-sm sm:px-3 sm:py-2"
          >
            +
          </Button>
        </div>

        <button
          onClick={() => dispatch(deleteItem(pizzaId))}
          className="rounded-lg bg-red-50 px-3 py-1 text-sm text-red-600 transition duration-300 hover:bg-red-100 sm:px-4 sm:py-2 sm:text-base"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default CartItem;
