import { formatCurrency } from "../../utils/helpers";
import Loader from "../../ui/Loader";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="group border-b border-stone-200 px-6 py-4 transition-colors duration-200 last:border-b-0 hover:bg-stone-50">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-stone-500">
              {quantity}&times;
            </span>
            <h3 className="truncate font-semibold text-stone-700">{name}</h3>
          </div>

          {isLoadingIngredients ? (
            <div className="mt-1 flex items-center gap-2">
              <Loader size="sm" />
              <span className="text-xs italic text-stone-400">
                Malzemeler yükleniyor...
              </span>
            </div>
          ) : ingredients ? (
            <p className="mt-1 truncate text-sm italic text-stone-500">
              {ingredients.join(", ")}
            </p>
          ) : (
            <p className="mt-1 text-sm text-red-500">Malzemeler yüklenemedi</p>
          )}
        </div>

        <div className="flex-shrink-0">
          <span className="font-medium text-stone-700">
            {formatCurrency(totalPrice)}
          </span>
        </div>
      </div>
    </li>
  );
}

export default OrderItem;
