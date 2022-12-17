import { Component, OnInit } from '@angular/core';
import {Test} from "../../model/test";
import {TestService} from "../../service/test/test.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ExamService} from "../../service/exam/exam.service";
import {ExamTest} from "../../model/exam-test";
import {ExamQuiz} from "../../model/exam-quiz";
import Swal from "sweetalert2";

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {
  test: Test;
  answerUserAr: number[] = [];
  answerUser: String = '';
  id: number; //id_test
  id_user: number;
  id_quiz: number;
  examQuiz: ExamQuiz;
  examQuizAr: ExamQuiz[] = [];
  examTest: ExamTest;
  examQuizzesDoneCheck: [];

  //step
  currentTab = 0; // Current tab is set to be the first tab (0)

  constructor(private testService: TestService,
              private examService: ExamService,
              private activatedRoute: ActivatedRoute,private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  ngOnInit(): void {
    this.testService.findById(this.id).subscribe(test => {
      this.test = test;
    });
  }

  ngAfterViewInit() {
    this.showTab(0);

    this.setTimeOut();
  }

  //step

  showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    // @ts-ignore
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
      document.getElementById("nextBtn").style.display = "none";
    } else {
      document.getElementById("nextBtn").style.display = "inline";
    }
    // ... and run a function that displays the correct step indicator:
    // this.fixStepIndicator(n)
  }

  nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    // if (n == 1 && !validateForm()) return false;
    // Hide the current tab:

    // @ts-ignore
    x[this.currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    this.currentTab = this.currentTab + n;
    // Otherwise, display the correct tab:
    this.showTab(this.currentTab);
  }

  validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[this.currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
      document.getElementsByClassName("step")[this.currentTab].className += " finish";
    }
    return valid; // return the valid status
  }

  // fixStepIndicator(n) {
  //   // This function removes the "active" class of all steps...
  //   var i, x = document.getElementsByClassName("step");
  //   for (i = 0; i < x.length; i++) {
  //     x[i].className = x[i].className.replace(" active", "");
  //   }
  //   //... and adds the "active" class to the current step:
  //   x[n].className += " active";
  // }

  getQuizId(id: number) {
    this.id_quiz = id;
  }

  click(value: number) {
    this.answerUserAr.push(value);
    this.answerUser = this.answerUserAr.join(';');
    this.id_user = Number(localStorage.getItem('ID_KEY'));
    this.examQuiz = {
      "quiz":
          {
            "id":this.id_quiz
          },
      "test":
          {
            "id":this.id
          },
      "answerUser":this.answerUser,
      // @ts-ignore
      appUser: {"id":this.id_user}
    }
  }

  send() {
    console.log(this.examQuiz);
    this.examService.saveQuiz(this.examQuiz).subscribe(examQuizDB => {
      this.examService.findEQById(examQuizDB.id).subscribe(examQuiz => {
        this.examQuizAr.push(examQuiz);
      });
    }, error => {
      console.log(error)
    });
    this.answerUserAr = [];
    this.answerUser = '';
    this.examQuiz = null;
  }

  submitTest() {
    this.checkAr(this.examQuizAr);
    Swal.fire({
      title: 'Are you sure?',
      text: this.examQuizzesDoneCheck.length + " / " + this.test.quizzes.length + " done!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit test!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.id_user = Number(localStorage.getItem('ID_KEY'));
        console.log(this.examQuizzesDoneCheck);
        this.examTest = {
          "examQuizzes": this.examQuizzesDoneCheck,
          // @ts-ignore
          appUser: {"id":this.id_user}
        }
        this.examService.saveTest(this.examTest).subscribe(() =>{
          console.log('Create done!');
          Swal.fire(
              'Done!',
              ' ',
              'success'
          )
        }, error => {
          console.log('chua nop dc bai!');
        });
        window.location.href = 'http://localhost:4200/user/exam/list';
      }
    })
  }

  checkAr(examQuizzes: ExamQuiz[]) {
    console.log(examQuizzes);
    this.examQuizzesDoneCheck = [];
    let examQuizzesRV = examQuizzes.reverse();
    let arrC = [];
    let arrCid = [];
    let arrD = [];
    let arrDid = [];
    for (let i = 0; i < examQuizzesRV.length; i++) {
      if(!arrC.includes(examQuizzesRV[i].quiz.id)) {
        arrC.push(examQuizzesRV[i].quiz.id);
        arrCid.push(examQuizzesRV[i].id);
      } else {
        arrD.push(examQuizzesRV[i].quiz.id);
        arrDid.push(examQuizzesRV[i].id);
      }
    }
    console.log("tao");
    console.log(arrC);
    console.log(arrCid);
    console.log("xoa");
    console.log(arrD);
    console.log(arrDid);

    for (let j = 0; j < arrCid.length; j++) {
      // @ts-ignore
      this.examQuizzesDoneCheck.push({"id": arrCid[j]});
    }
    for (let z = 0; z < arrDid.length; z++) {
      this.examService.delete(arrDid[z]).subscribe(() => {
        console.log("da xoa " + arrDid[z]);
      }, e => {
        console.log(e);
      });
    }
  }

  setTimeOut() {
    let timeout = this.test.maxTime.split(':');

    //time down
    // Thiết lập thời gian đích mà ta sẽ đếm
    var countDownDate = new Date().getTime() + Number(timeout[0]) * 60 * 60 * 1000 + Number(timeout[1]) * 60 * 1000 + Number(timeout[2]) * 1000 + 1000;


    // cập nhập thời gian sau mỗi 1 giây
    var x = setInterval(function() {

      // Lấy thời gian hiện tại
      var now = new Date().getTime();

      // Lấy số thời gian chênh lệch
      var distance = countDownDate - now;

      // Tính toán số ngày, giờ, phút, giây từ thời gian chênh lệch
      var hours = Math.floor(distance / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // HIển thị chuỗi thời gian trong thẻ p
      document.getElementById("demo").innerHTML = hours + ":"
          + minutes + ":" + seconds;

      // Nếu thời gian kết thúc, hiển thị chuỗi thông báo
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "0:0:0"
        document.getElementById("submit").click();
      }
    }, 1000);
  }

  logOut() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
            'Log Out',
            'Go to Home Page!',
            'success'
        )
        localStorage.clear();
        this.router.navigate(['home']).then(() => {
          location.reload()
        })
      }
    })
  }
}