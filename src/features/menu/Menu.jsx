import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import CartOverview from "../cart/CartOverview";
import MenuItem from "../menu/MenuItem";

function Menu() {
  const menu = useLoaderData();
  return (
    <div className="pb-14">
      <ul className="mt-2 divide-y">
        {menu.map((item) => (
          <MenuItem pizza={item} key={item.id} />
        ))}
      </ul>
      <CartOverview />
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
