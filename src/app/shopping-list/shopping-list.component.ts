import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from '../shared/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.ingredients;
    this.shoppingService.ingredientAdded.subscribe((ingredients: Ingredient[]) => {
     this.ingredients = ingredients;
   });
  }

}
