import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../service/category.service";
import {Category} from "../inteface/category";
declare var $:any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
    categoryForm : FormGroup=new FormGroup({
        id: new FormControl(),
        name :new FormControl("", [Validators.required, Validators.minLength(3)])
    });
    get name(){
        return this.categoryForm.get('name')
    }
  constructor( private categoryService : CategoryService) { }
    category:Category;
  ngOnInit(): void {
  }
  submit(){
      const  category =this.categoryForm.value;
      this.categoryService.save(category).subscribe(() =>{
              this.categoryForm.reset();
              // alert('successful')
          const type = ['','warning','warning','warning','warning'];

          var color = Math.floor((Math.random() * 4) + 1);
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
