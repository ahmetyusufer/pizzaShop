import { useSelector } from "react-redux";

function UserName() {
  const name = useSelector((state) => state.user.name);

  return (
    <h3
      className={`${!name ? "hidden" : "hidden md:block"} rounded-full border-2 bg-yellow-200 px-7 py-2`}
    >
      {name}
    </h3>
  );
}

export default UserName;
