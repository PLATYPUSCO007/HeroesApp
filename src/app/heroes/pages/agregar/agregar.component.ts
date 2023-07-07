import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from "rxjs/operators";
import { DialogComponent } from '../../components/dialog/dialog.component';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      max-width: 100%;
      border-radius: 10px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    superhero: '',
    alt_img: ''
  }

  constructor(private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroeService.getHeroe(id) )
      )
      .subscribe( (heroe) => this.heroe = heroe)
  }

  guardar(){
    if (this.heroe.superhero.trim().length <= 0 || this.heroe.alt_img.trim().length <= 0) {
      this.mostrarSnackBar('Hay campos obligatorios vacios!');
      return;
    }

    if (this.heroe.id) {
      //ACTUALIZAR
      this.heroeService.updateHeroe(this.heroe)
        .subscribe(heroe=>{
          this.heroe = heroe;
          this.mostrarSnackBar('Registro Actualizado');
          
        })
    }else{
      //CREAR
      this.heroeService.setHeroe(this.heroe)
        .subscribe(heroe=>{
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackBar('Registro Creado');
        })
    }

  }

  eliminar(){

    this.dialog.open(DialogComponent, {width: '500px', data: this.heroe})
      .afterClosed()
      .subscribe(result=>{
        if (!result) {
          this.mostrarSnackBar('Se cancelo la transacción.')
          return;
        }

        this.heroeService.borrarHeroe(this.heroe.id!)
          .subscribe(resp=>{
            this.router.navigate(['/heroes'])
          })
      })
  }

  mostrarSnackBar(mensaje: string):void {
    this.snackbar.open(mensaje, '👍', {
      duration: 5000
    })
  }

}
