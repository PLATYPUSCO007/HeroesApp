import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Form } from '../../interfaces/form.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  `
  ]
})
export class LoginComponent implements OnInit {

  @ViewChild('myForm') myForm!: NgForm;

  formModel: Form = {
    user: 'User',
    pass: '***'
  }

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  sigIn(){
    const user = this.myForm.controls['user']?.value;
    const pass = this.myForm.controls['pass']?.value;

    this.authService.sigIn(user, pass)
      .subscribe(resp => {
        
        if (resp.user) {
          this.router.navigate(['./heroes/listado']);
        }
      })
  }

}
