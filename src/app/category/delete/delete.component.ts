import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CategoryService} from "../service/category.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Category} from "../inteface/category";
import {data} from "jquery";
import {HttpResponseBase} from "@angular/common/http";
import Swal from "sweetalert2";
declare let swal : any;
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
    categoryFrom : FormGroup;
    category:Category;
    categories : Category[]=[];
    id:number;
    constructor(private categoryService : CategoryService,
                private router : Router,
                private activateRoute : ActivatedRoute) {
        this.activateRoute.paramMap.subscribe((paramMap: ParamMap) =>{
            this.id=+paramMap.get('id');
            this.getCategory(this.id);
        });
    }


  ngOnInit(): void {
       this.getAll();
       this.getCategoryById(this.id);
  }
getAll(){
   this.categoryService.getAll().subscribe(category =>{
       this.categories=category;
   }) ;
}

    getCategoryById(id: number) {
        this.categoryService.findById(id).subscribe(category =>{
            this.category = category;
        })
    }

  getCategory(id:number){
        return this.categoryService.findById(id).subscribe(category =>{
            this.categoryFrom=new FormGroup({
                id :new FormControl(category.id),
                name :new FormControl(category.name),
            });
        });
  }
  h:string;
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
                  // this.router.navigate(['/category']);
                  console.log(category)
                  console.log("OK 😄");

                  this.getAll();
              }, e => {
                  console.log(e)
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Action wrong!',
                      footer: ' '
                  })
              });
              ;
          }
      })
  }
      // even : IDBRequestEventMap
    e: HttpResponseBase;
}
