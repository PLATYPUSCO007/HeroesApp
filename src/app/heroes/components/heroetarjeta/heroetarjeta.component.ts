import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroetarjeta',
  templateUrl: './heroetarjeta.component.html',
  styleUrls: ['./heroetarjeta.component.css']
})
export class HeroetarjetaComponent implements OnInit {

  @Input()
  Objectheroe!: Heroe;

  constructor() { }

  ngOnInit(): void {
  }

}
