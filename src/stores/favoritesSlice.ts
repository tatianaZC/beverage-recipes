import { StateCreator } from 'zustand'
import { DetailRecipe } from '../types'
import { createNotificationSlice, NotificationSliceType } from './notificationSlice'

export type FavoritesSliceType = {
  favorites: DetailRecipe[]
  handleClickFavorite: (recipe: DetailRecipe) => void
  favoriteExists: (id: DetailRecipe['idDrink']) => boolean
  loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if(get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink )
      }))
      createNotificationSlice(set, get, api).showNotification({ 
        text: 'Removed from favorites', 
        error: false
      })
    } else {
      set({
        favorites: [ ...get().favorites, recipe ]
      })
      createNotificationSlice(set, get, api).showNotification({ 
        text: 'Added to favorites', 
        error: false
      })
    }
    localStorage.setItem('favorites', JSON.stringify(get().favorites))
  },
  favoriteExists: (id) => {
    return get().favorites.some(favorite => favorite.idDrink === id)
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem('favorites')
    if(storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites)
      })
    }
  }
})