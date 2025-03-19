import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useNavigation } from "react-router-dom";
import Loader from "./Loader";

function Layout() {
  const navigation = useNavigation();
  return (
    <>
      {navigation.state === "loading" ? <Loader /> : ""}
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
