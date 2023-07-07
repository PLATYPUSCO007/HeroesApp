import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [`
    span{
      color: tomato;
    }
  `
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  valorVacio: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | null = null;

  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {
  }

  buscar(){
    this.heroeService.getHeroesSugerencia(this.termino.trim())
    .subscribe(heroes => this.heroes = heroes);
    console.log("🚀 ~ file: buscar.component.ts ~ line 30 ~ BuscarComponent ~ buscar ~ heroes", this.heroes);

    this.valorVacio = this.termino;
    this.heroeSeleccionado = null;
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){

    let valor = event.option.value;
    console.log("🚀 ~ file: buscar.component.ts ~ line 38 ~ BuscarComponent ~ opcionSeleccionada ~ valor", valor)
      
    if (valor !== undefined) {
      
      const heroe: Heroe = valor;
      this.termino = heroe.superhero;
      this.heroeSeleccionado = heroe;
    }

  }
}
