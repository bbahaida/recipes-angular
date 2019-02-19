import {Injectable} from '@angular/core';
import {Ingredient} from './ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientSelected = new Subject<number>();

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
    this.notify();
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.notify();
  }

  update(index: number, ingredient: Ingredient) {
    this._ingredients[index] = ingredient;
    this.notify();
  }

  delete(index: number) {
    this._ingredients.splice(index, 1);
    this.notify();
  }

  private notify() {
    this.ingredientsChanged.next(this._ingredients.slice());
  }
}
