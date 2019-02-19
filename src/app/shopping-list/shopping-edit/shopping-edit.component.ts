import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingItemForm: NgForm;
  ingredientSelectedSubscription: Subscription;
  editMode = false;
  private index: number;

  constructor(private shoppingService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredientSelectedSubscription = this.shoppingService.ingredientSelected
      .subscribe((index: number) => {
        this.editMode = true;
        this.index = index;
        const ingredient = this.shoppingService.ingredients[index];
        this.shoppingItemForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        });
      });
  }

  onAddItem() {

  }

  onSubmit() {
    if (!this.shoppingItemForm.valid) {
      return;
    }
    const name = this.shoppingItemForm.value['name'];
    const amount = +this.shoppingItemForm.value['amount'];
    const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.shoppingService.update(this.index, ingredient);
    } else {
      this.shoppingService.addIngredient(ingredient);
    }
    this.clear();
  }

  onDelete() {
    if (!this.editMode || this.index < 0) {
      return;
    }
    this.shoppingService.delete(this.index);
    this.clear();
  }

  onReset() {
    this.clear();
  }

  ngOnDestroy(): void {
    this.ingredientSelectedSubscription.unsubscribe();
  }

  private clear() {
    this.shoppingItemForm.reset();
    this.editMode = false;
  }


}
