import { Recipe } from './../../_shared/models/recipe.model';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  repices: Recipe[] = [
    new Recipe('A Test Recipe','this is a simple test','https://hips.hearstapps.com/del.h-cdn.co/assets/18/06/640x959/gallery-1517928404-delish-mongolian-ramen-and-meatballs-pinterest-still001.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

}
