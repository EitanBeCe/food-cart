import { useContext } from "react";
import CartContext from "../../../../store/cart-context";
import CartIcon from "../../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = ({ onShowCart }) => {
  const cartCtx = useContext(CartContext);

  const numOfCartItems = cartCtx.items.reduce(
    (currNum, item) => currNum + item.amount,
    0
  );

  return (
    <button className={classes.button} onClick={onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
