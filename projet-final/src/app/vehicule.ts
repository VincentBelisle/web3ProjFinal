export interface Vehicule {
    _id?: string;
    poids: number;
    date_sortie: Date;
    marque: string;
    modele: string;    
    fabricant: string;
    entrainement: string;
    chevaux: number;
    consommation_moyenne: number;
    type_vehicule: string;
    nombre_cylindres: number;
    discontinue: boolean;
    transmission_disponible: TransmissionDisponible[];
    competiteurs: {
        fabricant: string;
        modele: string;
    }
}

export enum TransmissionDisponible {
    Automatique = 'Automatique',
    Manuelle = 'Manuelle',
    Sequentielle = 'Sequentielle',
}
    
