import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `.container { 
      margin: 10px 
    }`
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private heroesService: HeroesService) { }

  get auth(): Auth{
    return this.authService.auth;
  }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logOut().subscribe(result=>{
      console.log(result);
    })
  }

  testApi(){
    this.heroesService.getSO().subscribe(res=>{
      console.log(res);
      
    })
  }

}
