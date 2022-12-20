const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    "poids": {
      "type": "Number", required: [true,"Le poids est requis"], min: [0,"Le poids doit être supérieur à 0"]
    },
    "date_sortie": {

      "type": "Date", required: [true,"La date de sortie est requise"], min: "1900-01-01", max: "2022-31-31"

    },
    "competiteurs": [
      {
        _id: false,
        "fabricant": {
          "type": "String", required: [true,"Le fabricant est requis"], minLength: 2, maxLength: 200, validator: function (value){
            // la valeur ne doit pas contenir de chiffres
            return !/\d/.test(value);
          },
      

        },
        "modele": {
          "type": "String", required: [true,"Le modèle est requis"], minLength: 2, maxLength: 200
        }
      }
    ],
    "modele": {
      "type": "String", required: [true,"Le modèle est requis"], minLength: 2, maxLength: 200,
    },
    "transmission_disponible": {
      "type": [
        "String"
      ], required: true, minLength: 1, enum: {
        values: ['automatique', 'manuelle','séquentielle'],
        message: '{VALUE} n\'est pas une transmission valide'
    },
  },
    "fabricant": {
        "type": "String", required: [true,"Le fabricant est requis"], minLength: 2, maxLength: 200
    },
    "entrainement": {
        "type": "String", required: true, enum: {
            values:['propulsion arrière', 'traction avant', 'traction intégrale','4 roues motrices'],
            message: '{VALUE} n\'est pas un entrainement valide'
        }
    },
    "chevaux": {
        "type": "Number", required: [true,"Le nombre de chevaux est requis"], min: [0,"Le nombre de chevaux doit être supérieur à 0"]
    },
    "consommation_moyenne": {
        "type": "Number", required: [true,"La consommation moyenne est requise"],min: [0,"La consommation moyenne doit être supérieure à 0"]
    },
    "type_vehicule": {
        "type": "String", required: [true,"Le type de vehicule est requis"], enum: {
          values: ['Camion', 'Camionnette', 'Familiale', 'VUS', 'Coupe', 'Berline', 'Hatchback'],
          message: '{VALUE} n\'est pas un type de véhicule valide'
        }
    },
    "nombre_cylindres": {
        "type": "Number", required: [true,"Le nombre de cylindres est requis"], min: [0,"Le nombre de cylindres doit être supérieur ou égal à 0"], max: [16,"Le nombre de cylindres doit être inférieur ou égal à 16"]
    },
    "discontinue": {
        "type": "boolean", default: false
    },
}
);

schema.virtual('fabricant_modele').get(function () {
  return this.fabricant + ' ' + this.modele;
});




module.exports = mongoose.model('Vehicule', schema);

