export interface IRecipe {
    id: number;
    image: string;
    imageType: string;
    title: string;
}

export interface IRecipeInformation extends IRecipe {
    readyInMinutes: number;
    servings: number;
}

export interface IFavorite {
    name: string;
    preparationTime: number;
}