import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../../shared/recipe.service';
import {Recipe} from '../recipe.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  index: number;
  form: FormGroup;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) {
  }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.recipe = this.recipeService.getRecipe(this.index);
        this.initForm();
      }
    });
  }
  private initForm(): void {
    let name = '';
    let desc = '';
    let image = '';
    const ingredients = new FormArray([]);
    if (this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.index);
      name = this.recipe.name;
      image = this.recipe.imagePath;
      desc = this.recipe.description;
      this.recipe.ingredients.forEach((ingredient: Ingredient) => {
        ingredients.push(new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ]),
        }));
      });
    }
    this.form = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(desc, Validators.required),
      'imagePath': new FormControl(image, Validators.required),
      'ingredients': ingredients,
    });
  }
  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    console.log((<Recipe>this.form.value));
    /*this.recipe = new Recipe(
      this.form.value['name'],
      this.form.value['desc'],
      this.form.value['image'],
      (<Ingredient[]>this.form.value['ingredients']).slice());
    console.log(this.recipe);*/
    if (!this.editMode) {
      this.recipeService.addRecipe((<Recipe>this.form.value));
    } else {
      this.recipeService.update(this.index, (<Recipe>this.form.value));
    }
    this.clear();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  isLast(i: number): boolean {
    return this.getIngredientsFormArray().controls.length - 1 === i;
  }

  onAddIngredient() {
    this.getIngredientsFormArray().push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
    }));
  }

  onDeleteIngredient(index: number) {
    this.getIngredientsFormArray().removeAt(index);
  }

  onReset() {
    this.clear();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getIngredientsFormArray(): FormArray {
    return (<FormArray>this.form.get('ingredients'));
  }

  private clear() {
    this.form.reset();
  }

  isEmpty() {
    return this.getIngredientsFormArray().length === 0;
  }
}
