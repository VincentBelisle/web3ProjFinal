import { Component } from '@angular/core';
import { Vehicule } from './vehicule';
import { VehiculeService } from './vehicule.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet-final';

  vehicules: Vehicule[] = [];

  constructor(private vehiculeService: VehiculeService) { }

  ngOnInit(): void {
    this.getVehicules();
  }

  getVehicules(): void {
    this.vehiculeService.getVehicules()
      .subscribe(vehicules => this.vehicules = vehicules);
  }

}
