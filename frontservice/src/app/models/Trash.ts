export class Trash {
  [x: string]: any;
  id: number;
  code: string;
  lat: number;
  lon: number;
  city: string;
  client: string;
  tel: number;


  constructor(id: number = 0,
    code: string = '', lat = 0, lon =0) {
    this.id = id;
    this.code = code;
    this.lat = lat;
    this.lon = lon;
  }
}

