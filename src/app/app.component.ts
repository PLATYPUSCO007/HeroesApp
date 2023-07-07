import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth/services/auth.service';
import { EventBusService } from './shared/eventBus/services/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'heroesApp';
  eventBusSuscription?: Subscription;

  constructor(private authService: AuthService,
              private eventBusService: EventBusService){}

  ngOnInit(): void{
    this.eventBusSuscription = this.eventBusService.on('logout', ()=>{
      this.logOut();
    })
  }

  logOut(): void{
    this.authService.logOut().subscribe(res=>{
      console.log('El token Expiro', res);
    });
  }
}
