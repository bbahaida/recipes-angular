import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
      }
    ]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    children: [
      {
        path: ':id/edit',
        component: ShoppingEditComponent,
      }
    ],
  },
  {path: '**', redirectTo: '/recipes'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
