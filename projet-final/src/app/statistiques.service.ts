import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConsommationMoyenne } from './consommation-moyenne';
import { NombreVehicule } from './nombre-vehicule';


@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {

  statistiquesUrl = 'http://localhost:3000/statistiques';

  constructor(private http:HttpClient) { }

  getConsommationMoyenne(): Observable<ConsommationMoyenne[]> {
    return this.http.get<ConsommationMoyenne[]>(this.statistiquesUrl + '/consommation_moyenne');
  }

  getNombreVehicules(): Observable<NombreVehicule[]> {
    return this.http.get<NombreVehicule[]>(this.statistiquesUrl + '/nombre_vehicules');

  }


}
