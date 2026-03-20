export const getFoods = (req, res) => {
    const foods = [
        {id: 1, name: "Tea", price: 5},
        {id: 2, name: "Coffee", price: 5},
        {id: 3, name: "Pasta", price: 5},
    ];

    res.json(foods);
};