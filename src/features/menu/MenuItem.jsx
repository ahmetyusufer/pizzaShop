import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  decreaseItem,
  increaseItem,
  clearCart,
} from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.cart.find((item) => item.pizzaId === id),
  );
  const isInCart = !cartItem;

  const cartItemQuantity = cartItem?.quantity || 0;
  ("");
  function handleAddCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <div>
      <li className="flex items-center p-2">
        <img
          src={imageUrl}
          alt={name}
          className={`flex h-20 ${soldOut ? "grayscale" : ""}`}
        />
        <div className="ms-5 flex-grow">
          <p className="font-semibold">{name}</p>
          <p className="italic text-stone-500">{ingredients.join(", ")}</p>
          <div className="item mt-auto flex items-center justify-between">
            {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
            {isInCart ? (
              <Button
                onClick={() => {
                  handleAddCart();
                }}
                disabled={soldOut}
              >
                Add Cart
              </Button>
            ) : (
              <div className="flex">
                <div className="me-4">
                  <Button onClick={() => dispatch(decreaseItem(id))}>-</Button>
                  <span className="m-3">{cartItemQuantity}</span>
                  <Button onClick={() => dispatch(increaseItem(id))}>+</Button>
                </div>
                <Button
                  onClick={() => {
                    {
                      dispatch(clearCart());
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </li>
    </div>
  );
}

export default MenuItem;
