import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm/MealItemForm";

const MealItem = ({ name, descr, price, id }) => {
  const price$ = `$${price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{descr}</div>
        <div className={classes.price}>{price$}</div>
      </div>
      <div>
        <MealItemForm id={id} />
      </div>
    </li>
  );
};

export default MealItem;
