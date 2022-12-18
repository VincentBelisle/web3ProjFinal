import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../vehicule';
import { VehiculeService } from '../vehicule.service';

@Component({
  selector: 'app-liste-vehicules-type',
  templateUrl: './liste-vehicules-type.component.html',
  styleUrls: ['./liste-vehicules-type.component.css']
})
export class ListeVehiculesTypeComponent implements OnInit {

  vehicules: Vehicule[] = [];

  constructor(private vehiculeService: VehiculeService) { }


  ngOnInit(): void {
    this.getVehiculesParType('VUS');
  }

  getVehiculesParType(type: string): void {
    this.vehiculeService.getVehiculesParType(type)
      .subscribe(vehicules => this.vehicules = vehicules);
  }
}
