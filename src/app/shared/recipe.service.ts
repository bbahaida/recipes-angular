import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {Ingredient} from './ingredient.model';
import {ShoppingListService} from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private _recipes: Recipe[] = [
    new Recipe(
      'Burger King',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Meat', 2),
        new Ingredient('Cheese', 1),
        new Ingredient('French Fries', 20),
      ]),
    new Recipe(
      'Kemounia',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Cheese', 1),
        new Ingredient('Meat', 2),
      ])
  ];
  constructor(private shoppingListService: ShoppingListService) { }
  get recipes() {
    return this._recipes.slice();
  }
  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
  }
  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
