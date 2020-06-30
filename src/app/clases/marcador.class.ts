export class Marcador {
    public lat: number;
    public lng: number;
    public titulo: string = "Marcador sin titulo";
    public descripcion: string = "Marcador con descripción vacía";
    constructor(lat: number, lng: number){
        this.lat = lat;
        this.lng = lng;
    }
}