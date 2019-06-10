import { JarwisService } from './../../../services/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public form = {
    password: null,
    password_confirmation: null,
    reset_token: null
  };

  public error = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Jarwis: JarwisService
  ) {
    this.route.queryParams.subscribe(data => {
      this.form.reset_token = data['token']
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    this.Jarwis.resetPassowrd(this.form).subscribe(
      data => this.handelResponse(data),
      error => this.handelError(error)
    );
  }

  handelResponse(data) {
    this.router.navigateByUrl('/login');
  }

  handelError(error) {
    this.error = error.error.errors;
  }

}
