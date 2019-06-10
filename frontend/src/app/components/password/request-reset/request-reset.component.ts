import { JarwisService } from './../../../services/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  };

  constructor(
    private Jarwis: JarwisService,
    private notify: SnotifyService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.Jarwis.sendPasswordResetEmail(this.form).subscribe(
      data => this.handelResponse(data),
      error => this.handelError(error)
    );
  }

  handelResponse(data) {
    this.form.email = null;
    console.log(data);
  }

  handelError(error) {
    this.notify.error(error.error.error);
  }

}
