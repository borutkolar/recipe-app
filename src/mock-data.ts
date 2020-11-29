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
        image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=3634&h=1903&url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5445825.jpg',
        title: 'Pasta with cheese'
    },
    {
        id: 2,
        image: 'https://www.skinnytaste.com/wp-content/uploads/2011/07/Easiest-Pasta-and-Broccoli-Recipe.jpg',
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