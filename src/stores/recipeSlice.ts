import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { Categories, DetailRecipe, Drink, Recipes, SearchFilter } from "../types"

export type RecipesSliceType = {
  categories: Categories
  recipes: Recipes
  selectedRecipe: DetailRecipe
	modal: boolean
  fetchCategories: () => Promise<void>
  searchRecipes: (searchFilter: SearchFilter) => Promise<void>
  selectRecipe: (id: Drink['idDrink']) => Promise<void>
	closeModal: () => void
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: []
  },
  recipes: {
    drinks: []
  },
  selectedRecipe: {} as DetailRecipe,
	modal: false,
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
    const selectedRecipe = await getRecipeById(id)
		set({
			selectedRecipe,
			modal: true
		})
  },
	closeModal: () => {
		set({
			modal: false,
			selectedRecipe: {} as DetailRecipe
		})
	}
})