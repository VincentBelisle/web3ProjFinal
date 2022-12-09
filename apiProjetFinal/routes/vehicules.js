var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");


const Vehicule = require('../models/vehicule');
const { default: mongoose, mongo } = require('mongoose');



// Get tous les vehicules

router.get('/', async (req, res) => {

    console.log(process.env.MONGO_URL);

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

// Get un vehicule selon son id

router.get('/:vehiculeId', async (req, res) => {


    await mongoose.connect(process.env.MONGO_URL);


    try {

        const vehicule = await Vehicule.findById(req.params.vehiculeId);

        console.log(vehicule);

        res.json(vehicule);

    } catch (err) {

        res.json({ message: err });

    }

});

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

router.get('/entrainement/:entrainement', async (req, res) => {


    await mongoose.connect(process.env.MONGO_URL);


    try {

        const vehicules = await Vehicule.find({ "vehicule.entrainement": req.params.entrainement });

        console.log(vehicules);

        res.json(vehicules);

    } catch (err) {

        res.json({ message: err });

    }


});


// Ajouter un vehicule

router.post('/', auth, async (req, res) => {


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

router.put('/:vehiculeId', auth, async (req, res) => {


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

// Supprimer un vehicule selon son id

router.delete('/:vehiculeId', auth, async (req, res) => {


    await mongoose.connect(process.env.MONGO_URL);


    try {

        const removedVehicule = await Vehicule.remove({ _id: req.params.vehiculeId });

        res.json(removedVehicule);

    } catch (err) {

        res.json({ message: err });

    }


});


module.exports = router;
