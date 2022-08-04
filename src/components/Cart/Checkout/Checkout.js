import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

// Basic form validation with refs. Without onChange onBlur value, and check for touching an input, or useForm hook.
// I did it in other project (https://github.com/EitanBeCe/react-forms) an here just kept it simplier.

const stringIsEmpty = (str) => str.trim() === "";
const isFiveChars = (str) => str.trim().length >= 5;

const Checkout = ({ onHideCart, submitOrderHandler }) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !stringIsEmpty(enteredName);
    const enteredStreetIsValid = !stringIsEmpty(enteredStreet);
    const enteredCityIsValid = !stringIsEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    submitOrderHandler({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  // CSS classes
  const nameControlClasses = `${classes.control} ${
    formValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formValidity.postal ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formValidity.postal && (
          <p>Please enter a valid postal code (5 characters)</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.name && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onHideCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
