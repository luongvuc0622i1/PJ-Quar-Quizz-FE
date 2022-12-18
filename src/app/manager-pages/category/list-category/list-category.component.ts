import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../../model/category";
import {CategoryService} from "../../../service/category/category.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  categories: Category[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private categoryService: CategoryService,
              private router: Router) {}

  ngOnInit() {
    this.getAll();
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        // @ts-ignore
        var value = $(this).val().toLowerCase();
        // @ts-ignore
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    // @ts-ignore
    $("#myTable tr").paginator = this.paginator;
  };

  getAll(){
    this.categoryService.getAll().subscribe(categories=>{
      this.categories = categories;
    });
  }

  deleteCategory(id: number) {
    Swal.fire({
      title: 'Delete quiz',
      text: "Are you sure to delete this quiz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(id).subscribe(() => {
          Swal.fire(
              'Done!',
              ' ',
              'success'
          );
          this.router.navigate(['/manager/categories']);
          // location.reload();
        }, e => {
          console.log(e);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Action wrong!'
          })
        });
      }
    })
  }
}
