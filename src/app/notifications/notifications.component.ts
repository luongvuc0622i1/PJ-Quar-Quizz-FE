import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  showNotification(from, align){
      // const type = ['','info','success','warning','danger'];
      //
      // var color = Math.floor((Math.random() * 4) + 1);
      $.notify({
          icon: "pe-7s-check",
          message: "Create new quiz done!"
      },{
          type: 'success',
          timer: 1000,
          placement: {
              from: from,
              align: align
          }
      });
  }
}
