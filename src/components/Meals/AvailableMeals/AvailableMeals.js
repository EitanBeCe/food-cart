import classes from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const url =
  "https://react-starwars-api-f288b-default-rtdb.firebaseio.com/meal.json";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        console.log(data);

        const transformedMeals = [];
        
        for (let key in data) {
          transformedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
          
          setMeals(transformedMeals);
          setLoading(false);
        }

      } catch (error) {
        setError(true);
        return error.message;
      }
    };
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      descr={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{!loading ? mealsList : <p>Loading...</p>}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
