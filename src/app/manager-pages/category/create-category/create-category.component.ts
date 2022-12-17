import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../service/category/category.service";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm : FormGroup=new FormGroup({
    id: new FormControl(),
    name :new FormControl("", [Validators.required, Validators.minLength(3)])
  });
  get name(){
    return this.categoryForm.get('name')
  }
  constructor( private categoryService : CategoryService) { }
  ngOnInit(): void {
  }
  submit(){
    const  category =this.categoryForm.value;
    this.categoryService.save(category).subscribe(() =>{
      this.categoryForm.reset();
      const type = ['','warning','warning','warning','warning'];

      var color = Math.floor((Math.random() * 4) + 1);
      // @ts-ignore
      $.notify({
        icon: "pe-7s-gift",
        message: "Congratulations <b>Create success Categories</b>."
      },{
        type: type[color],
        timer: 1000,
        placement: {
          from: "top",
          align: "center"
        }
      });
    }, e=>{
      console.log(e);
    });
  }

}