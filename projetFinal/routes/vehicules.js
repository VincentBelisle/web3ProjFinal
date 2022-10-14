var express = require('express');
var router = express.Router();

const Vehicule = require('../models/vehicule');
const { default: mongoose, mongo } = require('mongoose');



// Get tous les vehicules

router.get('/', async (req, res) => {

    await mongoose.connect(process.env.MONGO_URL);


    try {
        const vehicules = await Vehicule.find();

        console.log(vehicules);
        res.json(vehicules);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get un vehicule selon son modele

router.get('/modele/:modele', async (req, res) => {

    await mongoose.connect(process.env.MONGO_URL);


    try {

        const vehicule = await Vehicule.findOne({ "vehicule.modele": req.params.modele });

        console.log(vehicule);

        res.json(vehicule);

    } catch (err) {

        res.json({ message: err });

    }

});

// Get les vehicules selon son fabricant

router.get('/fabricant/:fabricant', async (req, res) => {

    await mongoose.connect(process.env.MONGO_URL);


    try {

        const vehicules = await Vehicule.find({ "vehicule.fabricant": req.params.fabricant });


        console.log(vehicules);

        res.json(vehicules);

    } catch (err) {

        res.json({ message: err });

    }

});

// Get les vehicules selon leur type

router.get('/type/:type_vehicule', async (req, res) => {


    await mongoose.connect(process.env.MONGO_URL);


    try {

        const vehicules = await Vehicule.find({ "vehicule.type_vehicule": req.params.type_vehicule });


        console.log(vehicules);

        res.json(vehicules);

    } catch (err) {

        res.json({ message: err });

    }


});


// Get les vehicules selon leur entrainement

router.get('/entrainenment/:entrainement', async (req, res) => {


    await mongoose.connect(process.env.MONGO_URL);


    try {

        const vehicules = await Vehicule.find({ "vehicule.entrainement": req.params.entrainement });


        console.log(vehicules);

        res.json(vehicules);

    } catch (err) {

        res.json({ message: err });

    }


});

// Get les vehicules sorties apres une certaine date

router.get('/date_sortie/:date_out_gte', async (req, res) => {


    await mongoose.connect(process.env.MONGO_URL);


    try {

        const vehicules = await Vehicule.find({ "vehicule.date_sortie": { "$gte": req.params.date_out_gte } });


        console.log(vehicules);

        res.json(vehicules);


    } catch (err) {


        res.json({ message: err });


    }


});

// Get les vehicules discontinue ou non

router.get('/discontinue/:discontinue', async (req, res) => {


    await mongoose.connect(process.env.MONGO_URL);


    try {


        const vehicules = await Vehicule.find({ "vehicule.discontinue": req.params.discontinue });


        console.log(vehicules);


        res.json(vehicules);


    } catch (err) {


        res.json({ message: err });


    }


});

// Ajouter un vehicule

router.post('/', async (req, res) => {


    await mongoose.connect(process.env.MONGO_URL);

    // Creation d'une propriete virtuelle fabricant_modele

    vehicule.virtual('fabricant_modele', function () {

        return this.fabricant + ' ' + this.modele;



    });



    const vehicule = new Vehicule(

        req.body

    );


    try {


        await vehicule.save();

        res.json('Ajout du vehicule ' + vehicule.fabricant_modele);



    } catch (err) {


        res.json({ message: err });


    }


});

// Modifier un vehicule 

router.put('/:vehiculeId', async (req, res) => {


    await mongoose.connect(process.env.MONGO_URL);


    try {


        const updatedVehicule = await Vehicule.updateOne(

            { _id: req.params.vehiculeId },

            { $set: { vehicule: req.body } }

        )


        res.json(updatedVehicule);


    } catch (err) {


        res.json({ message: err });


    }


});


module.exports = router;
