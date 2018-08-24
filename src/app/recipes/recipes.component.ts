import { Component, OnInit } from '@angular/core';
import { Recipe } from '../_shared/models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Test1 Recipe','this is a simple test 1','https://hips.hearstapps.com/del.h-cdn.co/assets/18/06/640x959/gallery-1517928404-delish-mongolian-ramen-and-meatballs-pinterest-still001.jpg'),
    new Recipe('Test2 Recipe','this is a simple test 2','http://www.kevinandamanda.com/whatsnew/wp-content/uploads/2012/04/spicy-sausage-pasta-16b.jpg')
  ];
  currentRecipe: Recipe;
  constructor() { }

  ngOnInit() {
  }

}
