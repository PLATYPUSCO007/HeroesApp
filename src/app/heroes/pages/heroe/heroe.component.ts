import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`

    #imagen{
      border: 5px solid black;
    }

    #imagen > img {
      object-fit: cover;
      width: 100%;
      height: 400px;
      object-position: 0% 25%;
      filter: opacity(0.9) contrast(1.5);
      margin-bottom: -6px;
    }

    .info h1{
      text-align: center;
    }

    .info span{
      color: #f44336;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(private activatedRoute: ActivatedRoute, private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.heroesService.getHeroe(id))
      )
      .subscribe(heroe=>  
        this.heroe = heroe
      );
  }

}
