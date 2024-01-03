import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";

const requestConfig = {}
const Meals = () => {
    const { data: meals, error, isLoading } = useHttp('http://localhost:3000/meals', requestConfig, [])

    if (isLoading) {
        return <p className="center">Fetching meals...</p>
    }
    if (error) {
        return <Error title="Failed to fetch meals" message={error.message}/>
    }
    return (
        <ul id="meals">
            {meals.map(meal => {
                return (
                    <MealItem key={meal.id} meal={meal} />
                )
            })}
        </ul>
    )
}

export default Meals
