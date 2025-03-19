import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { getOrder } from "../../services/apiRestaurant";
import { useLoaderData, useFetcher } from "react-router-dom";
import { useEffect } from "react";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  const { status, priority, orderPrice, estimatedDelivery, cart } = order;

  const priorityPrice = order.priority ? order.orderPrice * 0.2 : 0; // Örnek hesaplama
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  return (
    <div className="space-y-4 rounded-lg border border-stone-200 p-4 shadow-md">
      <h1 className="inline rounded-md bg-red-300 p-3 italic">
        sipariş id: {order.id}
      </h1>

      {/* Status Section */}
      <div>
        <h2 className="mb-2 text-xl font-semibold text-stone-700">Status</h2>
        <div className="flex items-center gap-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-medium capitalize text-white">
            {status} order
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-stone-200" />

      {/* Delivery Time */}
      <div className="mb-4">
        <p
          className={`mb-1 text-sm ${
            deliveryIn >= 0 ? "animate-pulse text-emerald-500" : "text-red-500"
          }`}
        >
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-400">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      {/* Divider */}
      <div className="my-4 border-stone-200" />

      <ul className="divide-y divide-stone-200">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId).ingredients
            }
            isLoadingIngredients={fetcher.state === "loading"}
          />
        ))}
      </ul>

      {/* Price Section */}
      <div className="space-y-1">
        <p className="text-sm text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm text-red-500">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-sm font-bold text-stone-800">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
