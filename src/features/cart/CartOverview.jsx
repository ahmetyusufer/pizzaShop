import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalQuantity } from "./cartSlice";
import { getTotalPrice } from "./cartSlice";

function CartOverview() {
  const navigate = useNavigate();

  const totalQuantity = useSelector(getTotalQuantity);
  const TotalPrice = useSelector(getTotalPrice);

  return (
    <div className="fixed bottom-0 flex w-full items-center gap-2 bg-slate-900 p-4 shadow-md">
      <p className="flex gap-3 text-lg font-semibold text-white">
        <span>{totalQuantity} pizzas</span>
        <span>${TotalPrice}</span>
      </p>
      <a
        href="#"
        className="ml-auto font-medium text-blue-600 hover:text-blue-800"
        onClick={() => navigate("/cart")}
      >
        Open cart &rarr;
      </a>
    </div>
  );
}

export default CartOverview;
