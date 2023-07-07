import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [
  ]
})
export class DialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  borrar(){
    this.dialogRef.close(true);
    console.log('registro eliminado');
  }

  cerrar(){
    this.dialogRef.close();
    console.log('cancelar eliminacion');
  }

}
