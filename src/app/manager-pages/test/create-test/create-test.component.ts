import { Component, OnInit } from '@angular/core';
import {TestService} from "../../../service/test/test.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Level} from "../../../model/level";
import {Quiz} from "../../../model/quiz";
import {Category} from "../../../model/category";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  levels: Level[] = [];
  quizzes: Quiz[] = [];
  quizzesChoice: Quiz[] = [];
  categories: Category[] = [];
  categoriesChoice: Category[] = [];
  limit: number = 0;
  booleanT: boolean = false;

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.getAll();
  }

  ngAfterViewInit() {
    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        // @ts-ignore
        var value = $(this).val().toLowerCase();
        console.log(value);
        // @ts-ignore
        $("#myList tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  }

  testForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    level: new FormControl("", [Validators.required]),
    amount: new FormControl("", [Validators.required]),
    passScore: new FormControl("", [Validators.required]),
    maxTime: new FormControl("", [Validators.required]),
  })

  get name(){
    return this.testForm.get('name')
  }
  get level(){
    return this.testForm.get('level')
  }
  get passScore(){
    return this.testForm.get('passScore')
  }
  get maxTime(){
    return this.testForm.get('maxTime')
  }
  get amount(){
    return this.testForm.get('amount')
  }

  submit(){
    const test= this.testForm.value;
    console.log(test);
    const test1 = this.change(test);
    console.log(test1);
    this.testService.save(test1).subscribe(() =>{
      this.testForm.reset();
      console.log('Create done!');
      Swal.fire(
          'Done!',
          ' ',
          'success'
      )
    }, error => {
      console.log(error)
    });
  }

  getAll() {
    this.testService.getLevels().subscribe(levelList => {
      this.levels = levelList;
    });
    this.testService.getQuizzes().subscribe(quizList => {
      this.quizzes = quizList;
    });
    this.testService.getCategories().subscribe(categoryList => {
      this.categories = categoryList;
    });
  }

  change(test: any) {
    let id;
    let arCategory = [];
    let arLevel;
    let arQuiz= [];
    let test1;
    for (let i = 0; i < this.categoriesChoice.length; i++) {
      id = this.categoriesChoice[i].id;
      arCategory.push({id});
    }
    for (let i = 0; i < this.quizzesChoice.length; i++) {
      id = this.quizzesChoice[i].id;
      arQuiz.push({id});
    }
    for (let i = 0; i < test.level.length; i++) {
      id = test.level[i];
      arLevel = {id};
    }
    test1 = {name:test.name, level:arLevel, quizzes:arQuiz, passScore:test.passScore, categories:arCategory, maxTime:test.maxTime};
    return test1;
  }

  choose(quiz: any) {
    for (let i=0; i < this.quizzesChoice.length; i++) {
      console.log(this.quizzesChoice[i].id);
      if (this.quizzesChoice[i].id == quiz.id) {
        alert("Duplicate!");
      }
    }

    if (this.quizzesChoice.length < this.limit) {
      this.quizzesChoice.push(quiz);
      if (this.quizzesChoice.length == this.limit) {
        this.booleanT = true;
      }
    } else if (this.quizzesChoice.length = this.limit) {
      // this.quizzesChoice.push(quiz);
      this.booleanT = true;
    }
    // if (this.quizzesChoice.length = this.limit) {
    //   this.booleanT = true;
    // } else {
    //   this.booleanT = false;
    // }
  }

  inputNOQ(value: number) {
    this.limit = value;
  }

  choiceCategory(value: any) {
    console.log(value);
    this.categoriesChoice.push(value);
  }
}
