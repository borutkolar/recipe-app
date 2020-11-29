import { IFavorite, ISimilarRecipe } from "./interfaces";

const mockFavorites: IFavorite[] = [
    {
        id: 2,
        name: 'Pasta with salsa',
        preparationTime: 15
    }
];

const mockSimilarRecipes: ISimilarRecipe[] = [
    {
        id: 1,
        readyInMinutes: 10,
        title: 'Pasta with tuna'
    },
    {
        id: 2,
        readyInMinutes: 15,
        title: 'Pasta with salsa'
    },
    {
        id: 3,
        readyInMinutes: 20,
        title: 'Pasta with zucchini'
    }
];

export { mockFavorites, mockSimilarRecipes }