import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent{

    @Output() pageSelected= new EventEmitter<Boolean>();
    
    onSelect(page: string){
        if (page === 'recipes') {
            this.pageSelected.emit(true);
        }else if (page === 'shopping') {
            this.pageSelected.emit(false);
        }
        
    }

}