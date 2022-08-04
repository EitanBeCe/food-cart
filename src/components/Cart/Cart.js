import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout/Checkout";

// Here I didn't use useHttp Custom Hook. To write here everything again.
// I did it in other project (https://github.com/EitanBeCe/custom-hook2/blob/master/src/components/hooks/use-http.js).

const url =
  "https://react-starwars-api-f288b-default-rtdb.firebaseio.com/orders.json";

const Cart = ({ onHideCart }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSibmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  // Cart buttons
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onHideCart={onHideCart}
          submitOrderHandler={submitOrderHandler}
        />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitContentModal = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={onHideCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onHideCart={onHideCart}>
      {!isSubmitting && !didSibmit && cartModalContent}
      {isSubmitting && !didSibmit && isSubmittingModalContent}
      {!isSubmitting && didSibmit && didSubmitContentModal}
    </Modal>
  );
};

export default Cart;
