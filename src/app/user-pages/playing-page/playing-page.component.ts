import { Component, OnInit } from '@angular/core';
import {Test} from "../../model/test";
import {ExamQuiz} from "../../model/exam-quiz";
import {ExamTest} from "../../model/exam-test";
import {TestService} from "../../service/test/test.service";
import {ExamService} from "../../service/exam/exam.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-playing-page',
  templateUrl: './playing-page.component.html',
  styleUrls: ['./playing-page.component.scss']
})
export class PlayingPageComponent implements OnInit {
  test: Test;
  id: number; //id_test
  id_user: number;
  id_quiz: number = 0;
  examQuizAr: ExamQuiz[] = [];
  examTest: ExamTest;
  examQuizzesDoneCheck: [];
  numOfTA: number;
  arrCheck: ExamQuiz[] = [];
  quiz_id_now: number = 0;

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

    for (let i = 0; i < this.test.quizzes.length; i++) {
      Object.assign(this.test.quizzes[i], {checked: false});
      let a = this.test.quizzes[i].answer.split(';');
      let b = [];
      for (let j = 0; j < a.length; j++) {
        b.push({"name": a[j], "checked": false, "id": j});
      }
      this.test.quizzes[i].answer = b;
    }
  }

  getQuizId(id: number) {
    this.quiz_id_now = id;
  }

  // ngAfterViewChecked() {
  //     if (this.test.quizzes[this.quiz_id_now].answer.checked) {
  //       this.test.quizzes[this.quiz_id_now].checked = true;
  //     } else {
  //       this.test.quizzes[this.quiz_id_now].checked = false;
  //     }
  // }

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


    this.send();
    // this.quiz_id_now += n;
  }

  send() {
    let selected;
    let answerUserAr = [];
    let answerUser;
    let examQuiz;
    let t = this.test.quizzes[this.quiz_id_now].answer
        .filter(opt => opt.checked)
        .map(opt => opt);
    selected = t;

    for (let i=0; i < selected.length; i++) {
      answerUserAr.push(selected[i].id + 1);
    }

    answerUser = answerUserAr.join(';');
    this.id_user = Number(localStorage.getItem('ID_KEY'));
    if (answerUser) {
      examQuiz = {
        "quiz":
            {
              "id":(this.test.quizzes[this.quiz_id_now].id)
            },
        "test":
            {
              "id":this.id
            },
        "answerUser":answerUser,
        // @ts-ignore
        appUser: {"id":this.id_user}
      }
    }
    console.log(this.quiz_id_now)
    console.log(examQuiz)
    this.examService.saveQuiz(examQuiz).subscribe(examQuizDB => {
      this.test.quizzes[this.quiz_id_now].checked = true;
      this.examService.findEQById(examQuizDB.id).subscribe(examQuiz => {
        this.examQuizAr.push(examQuiz);
      });
    }, error => {
      this.test.quizzes[this.quiz_id_now].checked = false;
      console.log(error)
    });
  }

  submitTest() {
    // this.checkAr(this.examQuizAr);
    Swal.fire({
      title: 'Are you sure?',
      text:
          // this.examQuizzesDoneCheck.length + " / " + this.test.quizzes.length +
          "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Submit'
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitDone();
      }
    })
  }

  setNumOfTA(arr: ExamQuiz[]): number {
    console.log(arr);
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      //Kiem tra cau tra loi
      const a = arr[i].answerUser.split(';'); //day la dap an nguoi dung
      const b = arr[i].quiz.correct_answer.split(';'); //day la correct answer
      let isEqual = true;
      if (a.length == b.length) {
        for (let i=0; i < a.length; i++) {
          let equal = false;
          for (let j = 0; j < b.length; j++) {
            if(a[i] == b[j]) {
              equal = true;
              break;
            }
          }
          isEqual &&= equal;
        }
      } else {
        isEqual = false;
      }
      if (isEqual) {
        count++;
      }
    }
    return count;
  }

  submitDone() {
    this.checkAr(this.examQuizAr);
    this.id_user = Number(localStorage.getItem('ID_KEY'));
    this.numOfTA = this.setNumOfTA(this.arrCheck);
    this.examTest = {
      "examQuizzes": this.examQuizzesDoneCheck,
      // @ts-ignore
      appUser: {"id":this.id_user},
      "numOfTA": this.numOfTA
    }
    console.log("end")
    console.log(this.examTest)
    this.examService.saveTest(this.examTest).subscribe(() =>{
      Swal.fire(
          'Done!',
          ' ',
          'success'
      )
      this.router.navigate(['/user/home']);
    }, error => {
      console.log('chua nop dc bai!');
    });
  }

  checkAr(examQuizzes: ExamQuiz[]) {
    console.log(examQuizzes);
    this.examQuizzesDoneCheck = [];
    this.arrCheck = [];
    let examQuizzesRV = examQuizzes.sort().reverse();
    console.log(examQuizzesRV)
    let arrC = [];
    let arrCid = [];
    let arrD = [];
    let arrDid = [];
    for (let i = 0; i < examQuizzesRV.length; i++) {
      if(!arrC.includes(examQuizzesRV[i].quiz.id)) {
        arrC.push(examQuizzesRV[i].quiz.id);
        arrCid.push(examQuizzesRV[i].id);
        this.arrCheck.push(examQuizzesRV[i]);
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
      var hours: string | number = Math.floor(distance / (1000 * 60 * 60));
      var minutes: string | number = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds: string | number = Math.floor((distance % (1000 * 60)) / 1000);

      // HIển thị chuỗi thời gian trong thẻ p
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      document.getElementById("demo").innerHTML = hours + ":"
          + minutes + ":" + seconds;

      // Nếu thời gian kết thúc, hiển thị chuỗi thông báo
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "00:00:00"
        document.getElementById("submit").click();
      }
    }, 1000);
  }
}