import { TokenService } from './../../services/token.service';
import { JarwisService } from './../../services/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.Jarwis.login(this.form).subscribe(
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
    this.error = error.error.error;
  }

}
