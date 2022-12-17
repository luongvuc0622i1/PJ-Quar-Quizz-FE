import { Component, OnInit } from '@angular/core';
import {Category} from "../../../model/category";
import {CategoryService} from "../../../service/category/category.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService : CategoryService) {}

  ngOnInit() {
    this.getAll();
    console.log(this.categories)
  }

  getAll(){
    this.categoryService.getAll().subscribe(categories=>{
      this.categories = categories;
    });
  }

  deleteCategory(id : number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete now!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
            'Done!',
            ' ',
            'success'
        )
        this.categoryService.delete(id).subscribe(category => {
          console.log("delete done");
        }, e => {
          console.log(e)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Action wrong!',
            footer: ' '
          })
        });
      }
    })
  }
}
