import { Component, OnInit } from '@angular/core';
import {Category} from "../inteface/category";
import {CategoryService} from "../service/category.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    category:Category[]=[];
    constructor(private categoryService : CategoryService) {
    }
    ngOnInit() {
        this.getAll();
    }
    getAll(){
        this.categoryService.getAll().subscribe(category=>{
            this.category=category;
        });
    }
}
