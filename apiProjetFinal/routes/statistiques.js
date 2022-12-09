var express = require('express');
var router = express.Router();

const Vehicule = require('../models/vehicule');
const { default: mongoose, mongo } = require('mongoose');


// Get la consommation moyenne selon le type de vehicule

router.get('/consommation/:type_vehicule', async (req, res) => {

    mongoose.connect(process.env.MONGO_URL);


    try {

        const consommation_moyenne = await Vehicule.aggregate(

            [

                { $group: { _id: '$type_vehicule', consommation_moyenne : {$avg: '$consommation_moyenne' } },

                },

            ]

        );

        console.log(consommation_moyenne);

        res.json(consommation_moyenne);

    } catch (err) {

        res.json({ message: err });

    }

});

// Get le nombre de vehicule par type de vehicule

router.get('/nombre/:type_vehicule', async (req, res) => {

    mongoose.connect(process.env.MONGO_URL);


    try {

        const nombre_vehicule = await Vehicule.aggregate(

            [

                { $group: { _id: '$type_vehicule', nombre_vehicules : { $sum: 1} } }

            ]

        );

        console.log(nombre_vehicule);

        res.json(nombre_vehicule);

    } catch (err) {

        res.json({ message: err });

    }

});

module.exports = router;




