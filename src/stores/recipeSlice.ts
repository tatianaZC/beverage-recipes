import { StateCreator } from "zustand"
import { getCategories, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Recipes, SearchFilter } from "../types"

export type RecipesSliceType = {
  categories: Categories
  recipes: Recipes
  fetchCategories: () => Promise<void>
  searchRecipes: (searchFilter: SearchFilter) => Promise<void>
  selectRecipe: (id: Drink['idDrink']) => Promise<void>
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: []
  },
  recipes: {
    drinks: []
  },
  fetchCategories: async () => {
    const categories = await getCategories()
    set({
      categories
    })
  },
  searchRecipes: async (filters) => {
    const drinks = await getRecipes(filters)
    set({
      recipes: drinks
    })
  },
  selectRecipe: async (id) => {
    console.log(id)
  },
})