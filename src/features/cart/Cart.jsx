import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, getTotalPrice } from "./cartSlice";

import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  const name = useSelector((state) => state.user.name);
  const totalPrice = useSelector(getTotalPrice);

  if (cart.length <= 0) {
    return <EmptyCart />;
  }
  return (
    <div>
      <div className="mx-auto max-w-7xl space-y-6 p-4">
        {/* Geri dönüş linki */}
        <Link
          to="/menu"
          className="inline-flex items-center space-x-2 text-blue-600 transition duration-300 hover:text-blue-800 hover:underline"
        >
          <span>&larr;</span>
          <span>Back to menu</span>
        </Link>

        {/* Başlık */}
        <h2 className="text-3xl font-bold text-gray-800">Your cart, {name}</h2>

        {/* Kart öğeleri listesi */}
        <ul className="divide-y divide-gray-300">
          {cart.map((item) => (
            <CartItem item={item} key={item.pizzaId} />
          ))}
        </ul>

        {/* Toplam fiyat */}
        <h1 className="border-t border-gray-300 pt-4 text-xl font-semibold text-gray-900">
          Total: ${totalPrice.toFixed(2)}
        </h1>

        {/* Butonlar */}
        <div className="mt-6 flex space-x-9">
          <Link
            to="/order/new"
            className="rounded-lg bg-green-600 px-6 py-3 text-white transition duration-300 hover:bg-green-700"
          >
            Order pizzas
          </Link>
          <button
            className="rounded-lg bg-red-600 px-6 py-3 text-white transition duration-300 hover:bg-red-700"
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
