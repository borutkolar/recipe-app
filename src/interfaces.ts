export interface IRecipe {
    id: number;
    image: string;
    imageType: string;
    title: string;
}

export interface IRecipeInformation extends IRecipe {
    instructions: string;
    readyInMinutes: number;
    servings: number;
}

export interface IFavorite {
    id: number;
    name: string;
    preparationTime: number;
}