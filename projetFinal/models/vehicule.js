const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(

  {

    "poids": {
      "type": "Number", required: true, min: 0
    },
    "annee": {

      "type": "Date", required: true, max: new Date("2024-01-01")

    },
    "competiteurs": [
      {
        _id: false,
        "fabricant": {
          "type": "String", required: true
        },
        "modele": {
          "type": "String", required: true
        }
      }
    ],
    "modele": {
      "type": "String", required: true, minLength: 2, maxLength: 200
    },
    "transmission_disponible": {
      "type": [
        "String"
      ], required: true, minLength: 1, enum: ['automatique', 'manuel','séquentielle']
    },
    "fabricant": {
        "type": "String", required: true, minLength: 2, maxLength: 200
    },
    "entrainement": {
        "type": "enum", required: true, enum: ['propulsion arrière', 'traction avant', 'traction intégrale','4 roues motrices']
    },
    "chevaux": {
        "type": "Number", required: true, min: 0
    },
    "consommation_moyenne": {
        "type": "Number", required: true, min: 0
    },
    "type_vehicule": {
        "type": "enum", required: true, enum: ['Camion', 'Camionnette', 'Familiale', 'VUS', 'Coupe', 'Berline', 'Hatchback']
    },
    "nombre_cylindres": {
        "type": "Number", required: true, min: 0
    },
    "discontinue": {
        "type": "boolean", required: true, default: false
    },
    
  }
);



module.exports = mongoose.model('Vehicule', schema);
