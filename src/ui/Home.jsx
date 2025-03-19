import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateName } from "../features/user/userSlice";

function Home() {
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (name) {
      dispatch(updateName(name));
      navigate("/menu");
    }
  }

  return (
    <div className="mt-12 px-4 text-center sm:mt-24">
      <h1 className="text-lg font-semibold sm:text-xl md:text-2xl">
        The best pizza.
      </h1>
      <p className="text-lg font-semibold tracking-wider text-yellow-500 sm:text-xl md:text-2xl">
        Straight out of the oven, straight to you.
      </p>
      <p className="mt-6 text-sm text-stone-500 sm:mt-8 sm:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>
      <input
        type="text"
        placeholder="Your Full Name"
        className="mt-4 w-full max-w-xs rounded-full bg-slate-200 p-3 focus:outline-red-200 focus:ring-4 focus:ring-yellow-300 sm:max-w-sm md:max-w-md"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
      />

      {name && (
        <button
          className="m-auto mt-6 block rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold transition duration-500 hover:bg-yellow-300 sm:mt-8 sm:px-8 sm:py-4 sm:text-base"
          onClick={handleSubmit}
        >
          START ORDERING
        </button>
      )}
    </div>
  );
}

export default Home;
