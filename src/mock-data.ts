import { IFavorite, IRecipe, ISimilarRecipe } from "./interfaces";

const mockFavorites: IFavorite[] = [
    {
        id: 2,
        name: 'Pasta with broccoli',
        preparationTime: 30
    },
    {
        id: 4,
        name: 'Pasta with salsa',
        preparationTime: 15
    }
];

const mockRecipes: IRecipe[] = [
    {
        id: 1,
        image: '',
        title: 'Pasta with cheese'
    },
    {
        id: 2,
        image: '',
        title: 'Pasta with broccoli'
    },
]

const mockSimilarRecipes: ISimilarRecipe[] = [
    {
        id: 3,
        readyInMinutes: 10,
        title: 'Pasta with tuna'
    },
    {
        id: 4,
        readyInMinutes: 15,
        title: 'Pasta with salsa'
    },
    {
        id: 5,
        readyInMinutes: 20,
        title: 'Pasta with zucchini'
    }
];

export { mockFavorites, mockRecipes, mockSimilarRecipes }