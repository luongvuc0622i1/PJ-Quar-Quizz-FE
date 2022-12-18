import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../service/category/category.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  constructor( private categoryService : CategoryService) {}

  ngOnInit(): void {
  }

  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name :new FormControl("", [Validators.required])
  });

  get name(){
    return this.categoryForm.get('name');
  }

  submit(){
    const  category =this.categoryForm.value;
    this.categoryService.save(category).subscribe(() =>{
      Swal.fire(
          'Done!',
          ' ',
          'success'
      );
      this.categoryForm.reset();
    }, e=>{
      console.log(e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Action wrong!'
      })
    });
  }

}