export const getMeals = async() => {
    try {
        const res = await fetch('http://localhost:3000/meals')
        if (!res.ok) {
            return
        }
        const meals = await res.json()
        return meals
    }
    catch (error) {
        console.error(error);
        return error;
    }
}