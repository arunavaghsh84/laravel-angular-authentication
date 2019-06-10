import { AuthService } from './../../services/auth.service';
import { TokenService } from './../../services/token.service';
import { JarwisService } from './../../services/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  };

  public error = [];

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.Jarwis.signup(this.form).subscribe(
      data => this.handelResponse(data),
      error => this.handelError(error)
    );
  }

  handelResponse(data) {
    this.Token.handel(data.access_token);
    this.Auth.changeStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handelError(error) {
    this.error = error.error.errors;
  }

}
