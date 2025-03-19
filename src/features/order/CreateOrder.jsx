import { useSelector, useDispatch } from "react-redux";
import { Form, redirect, useActionData } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { fetchAddress } from "../user/userSlice";
import Button from "../../ui/Button";

// Telefon numarası geçerliliğini kontrol eden fonksiyon
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.name);
  const cart = useSelector((state) => state.cart.cart);
  const {
    status: addressStatus,
    position,
    address,
    error: errorAdress,
  } = useSelector((state) => state.user);
  const isLoadingAdress = addressStatus === "loading";
  return (
    <div className="mx-auto mt-10 max-w-lg rounded-xl bg-white p-6 shadow-lg sm:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Ready to order? Let's go!
      </h1>

      <Form method="POST" className="space-y-6">
        {/* İsim */}
        <div>
          <label
            htmlFor="customer"
            className="block text-sm font-medium text-gray-700"
          >
            First Name:
          </label>
          <input
            type="text"
            id="customer"
            name="customer"
            defaultValue={name}
            className="mt-2 w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200"
          />
          {formErrors?.customer && (
            <p className="mt-2 text-sm text-red-500">{formErrors.customer}</p>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="mt-2 w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200"
          />
          {formErrors?.phone && (
            <p className="mt-2 text-sm text-red-500">{formErrors.phone}</p>
          )}
        </div>

        {/* Adres */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            defaultValue={address}
            disabled={isLoadingAdress}
            className="mt-2 w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200"
          />

          {(formErrors?.address || addressStatus === "error") && (
            <p className="mt-2 text-sm text-red-500">
              {formErrors?.address || errorAdress}
            </p>
          )}

          {!position.latitude && !position.longitude && (
            <span>
              <Button
                className={"mt-4 w-full sm:mt-4"}
                onClick={() => dispatch(fetchAddress())}
                disabled={isLoadingAdress}
              >
                Get Location
              </Button>
            </span>
          )}
        </div>

        {/* Öncelikli Sipariş Seçeneği */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-200"
            name="priority"
          />
          <span className="text-gray-700">
            Want to give your order priority?
          </span>
        </div>

        {/* Sipariş Butonu */}
        <button className="w-full rounded-lg bg-yellow-400 p-3 text-lg font-semibold text-white transition duration-300 hover:bg-yellow-500">
          Order Now
        </button>

        {/* Sepet Verisini Gizli Alan Olarak Gönderme */}
        <input name="cart" type="hidden" value={JSON.stringify(cart)} />
        <input
          name="position"
          type="hidden"
          value={
            position.longitude && position.latitude
              ? `${position.latitude}, ${position.longitude}`
              : ""
          }
        />
      </Form>
    </div>
  );
}

// Form verilerini işler
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please provide a valid phone number.";
  }
  if (!order.customer) {
    errors.customer = "Please enter your full name.";
  }
  if (!order.address) {
    errors.address = "Please enter your full address.";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
