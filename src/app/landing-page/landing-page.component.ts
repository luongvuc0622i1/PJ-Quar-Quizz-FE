import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router) { }

  account() {
    this.router.navigate(['/account']);
  }

  data : Date = new Date();
  focus;
  focus1;


  ngOnInit() {

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
  ngAfterViewInit(){
    //===== Sticky

    $(window).on('scroll', function (event) {
      var scroll = $(window).scrollTop();
      if (scroll < 20) {
        $(".navbar-area").removeClass("sticky");
        $(".navbar .navbar-brand img").attr("src", "../../assets/img/logo_white.png");
      } else {
        $(".navbar-area").addClass("sticky");
        $(".navbar .navbar-brand img").attr("src", "../../assets/img/logo.png");
      }
    });


    //===== Back to top

    // Show or hide the sticky footer button
    $(window).on('scroll', function (event) {
      if ($(this).scrollTop() > 600) {
        $('.back-to-top').fadeIn(200)
      } else {
        $('.back-to-top').fadeOut(200)
      }
    });


    //Animate the scroll to yop
    $('.back-to-top').on('click', function (event) {
      event.preventDefault();

      $('html, body').animate({
        scrollTop: 0,
      }, 1500);
    });

  }
}
