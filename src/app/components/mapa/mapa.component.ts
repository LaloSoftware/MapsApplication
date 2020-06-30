import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/clases/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  Marcadores: Marcador[] = [];
  lat: number = 20.4242944;
  lng: number = 101.718511414;
  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { 
    if(localStorage.getItem("marcadores")){
      this.Marcadores = JSON.parse(localStorage.getItem("marcadores"));
    }
  }

  ngOnInit(): void {
  }

  agregarMarcador(event){
    const coordenadas = event["coords"];
    const nMarcador = new Marcador(coordenadas["lat"], coordenadas["lng"]);
    this.Marcadores.push(nMarcador);
    this.almacenar();
    this._snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
  }

  eliminar(index: number){
    this.Marcadores.splice(index, 1);
    this.almacenar();
    this._snackBar.open('Marcador eliminado', 'Cerrar', { duration: 3000 });
  }

  almacenar(){
    localStorage.setItem("marcadores", JSON.stringify(this.Marcadores));
  }

  editarMarcador(marcador: Marcador){
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, descripcion: marcador.descripcion}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        return;
      } 
      marcador.titulo = result.titulo;
      marcador.descripcion = result.descripcion;
      this.almacenar();
      this._snackBar.open("Se actualizó correctamente", "Cerrar", { duration: 3000 });
    });
  }
}
