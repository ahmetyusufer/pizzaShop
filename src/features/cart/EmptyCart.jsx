import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* Geri dönüş linki */}
      <Link
        to="/menu"
        className="inline-flex items-center space-x-2 text-blue-600 transition duration-300 hover:text-blue-800 hover:underline"
      >
        <span>&larr;</span>
        <span>Return to Menu</span>
      </Link>

      {/* Boş sepet mesajı ve görsel içerik */}
      <div className="mt-8 text-center">
        <img
          src="../../shopping-basket.png" // Boş sepet görseli (kendi projenize uygun bir görsel ekleyin)
          alt="Empty Cart"
          className="mx-auto mb-6 h-48 w-48"
        />
        <h2 className="text-3xl font-bold text-gray-800">
          Your cart is empty.
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          It looks like you haven't added anything to your cart yet.
        </p>
        <p className="mt-2 text-lg text-gray-600">
          Explore our delicious menu and discover the perfect pizzas for you!
        </p>
      </div>

      {/* Ek bilgi veya teklifler */}
      <div className="mt-12 rounded-lg bg-gray-100 p-6 text-center">
        <h3 className="text-xl font-semibold text-orange-600">
          Special Offers for You!
        </h3>
        <p className="mt-2 font-semibold text-gray-600">
          Don't miss out on our exclusive deals. Order now and enjoy discounts
          on your favorite pizzas!
        </p>
      </div>
    </div>
  );
}

export default EmptyCart;
