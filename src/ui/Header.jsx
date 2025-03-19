import { Link } from "react-router-dom";
import UserName from "../features/user/UserName";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  function handleSubmit() {
    navigate(`/order/${value}`);
  }
  return (
    <div className="flex h-16 items-center justify-between bg-amber-300 px-4 py-2 sm:h-20 sm:px-8 sm:py-4">
      {/* Logo veya Başlık */}
      <Link to="/">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 transition duration-300 hover:text-gray-900 sm:text-lg">
          Pizza CO.
        </h2>
      </Link>

      {/* Arama Inputu */}
      <input
        placeholder="Search Order #"
        className="w-48 rounded-full bg-amber-50 px-4 py-2 text-center text-sm transition duration-300 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:w-64 sm:px-6 sm:py-3 sm:text-base md:w-72"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
      />

      {/* Kullanıcı Adı */}
      <UserName />
    </div>
  );
}

export default Header;
