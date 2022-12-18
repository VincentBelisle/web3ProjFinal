import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicule } from './vehicule';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  vehiculesUrl = 'http://localhost:3000/vehicules';

  constructor(private http: HttpClient) { }

  getVehicules(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.vehiculesUrl);
  }

  ajoutVehicule(vehicule: Vehicule): Observable<Vehicule> {
    return this.http.post<Vehicule>(this.vehiculesUrl, vehicule, httpOptions);
  }
  supprimerVehicule(vehicule: Vehicule): Observable<Vehicule> {
    const url = `${this.vehiculesUrl}/${vehicule._id}`;
    return this.http.delete<Vehicule>(url, httpOptions);
  }

  getVehiculesParModele(modele: string): Observable<Vehicule[]> {
    const url = `${this.vehiculesUrl}/modele/${modele}`;
    return this.http.get<Vehicule[]>(url);
  }

  getVehiculesParFabricant(fabricant: string): Observable<Vehicule[]> {
    const url = `${this.vehiculesUrl}/fabricant/${fabricant}`;
    return this.http.get<Vehicule[]>(url);
  }
  getVehiculesParType(type: string): Observable<Vehicule[]> {
    const url = `${this.vehiculesUrl}/type/${type}`;
    return this.http.get<Vehicule[]>(url);
  }
  getVehiculesParEntrainement(entrainement: string): Observable<Vehicule[]> {
    const url = `${this.vehiculesUrl}/entrainement/${entrainement}`;
    return this.http.get<Vehicule[]>(url);
  }

  

}
