var express = require('express');
var router = express.Router();

const Vehicule = require('../models/vehicule');
const { default: mongoose, mongo } = require('mongoose');


// Get la consommation moyenne par type de vehicule

router.get('/consommation_moyenne', async (req, res) => {

    await mongoose.connect(process.env.MONGO_URL);

    try {

        const consommation_moyenne = await Vehicule.aggregate([

            {

                $group: {

                    _id: "$type_vehicule",

                    consommation_moyenne: { $avg: "$consommation_moyenne" },

                },

            },

        ]);


        res.json(consommation_moyenne);


    } catch (err) {

        res.json({ message: err });

    }

});



// Get le nombre de vehicule par type de vehicule

router.get('/nombre_vehicules', async (req, res) => {

    await mongoose.connect(process.env.MONGO_URL);

    try {
        const nombre_vehicules = await Vehicule.aggregate([
          
          {
            $group: {
              _id: "$type_vehicule",
              nombre_vehicules: { $sum: 1 },
            },
          },
        ]);
    
        res.json(nombre_vehicules);

      } catch (err) {
        res.json({ message: err });
      }

});

module.exports = router;




