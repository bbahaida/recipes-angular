import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new EventEmitter<Ingredient[]>();

  constructor() {
  }

  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  get ingredients() {
    return this._ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientAdded.emit(this._ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientAdded.emit(this._ingredients.slice());
  }
}
