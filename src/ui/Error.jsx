import { useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-100 p-4 text-center"
      style={{ minHeight: "calc(100vh - 4rem)" }} // Navbar yüksekliğini çıkarın
    >
      <h1 className="mb-4 text-4xl font-bold text-gray-800">
        Something went wrong 😢
      </h1>
      <p className="mb-8 text-lg text-gray-600">
        {error.data || error.message}
      </p>

      <button
        onClick={() => navigate(-1)}
        className="rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-blue-600"
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default NotFound;
