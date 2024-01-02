import { useState, useEffect } from "react";
import { getMeals } from "../utils/http.js";
import MealItem from "./MealItem.jsx";

const Meals = () => {
    const [meals, setMeals] = useState([]);
    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const fetchedMeals = await getMeals();
                setMeals(fetchedMeals);
                console.log(fetchedMeals);
            } catch (error) {
                console.error("Error fetching meals:", error);
                // You can handle the error state or show an error message here
            }
        };

        fetchMeals();

    }, []);
    return (
        <ul id="meals">
            {meals.map(meal => {
                return (
                    <MealItem key={meal.id} meal={meal}/>
                )
            })}
        </ul>
    )
}

export default Meals
