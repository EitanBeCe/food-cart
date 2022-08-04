import classes from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

// Here I didn't use useHttp Custom Hook. To write here everything again.
// I did it in other project (https://github.com/EitanBeCe/custom-hook2/blob/master/src/components/hooks/use-http.js).

const url =
  "https://react-starwars-api-f288b-default-rtdb.firebaseio.com/meals.json";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(false);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      // console.log(data);

      const transformedMeals = [];

      for (let key in data) {
        transformedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });

        setMeals(transformedMeals);
        setIsLoading(false);
      }
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.meals}>
        <Card>
          <p>Loading...</p>
        </Card>
      </section>
    );
  }

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
        <ul>{error ? error : mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
