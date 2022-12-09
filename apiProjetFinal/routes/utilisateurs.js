var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const Utilisateur = require('../models/utilisateur');
const { default: mongoose, mongo } = require('mongoose');


// S'inscrire

router.post("/inscription", async (req, res) => {
    

 // Our register logic starts here
 try {

    await mongoose.connect(process.env.MONGO_URL);

    // Get utilisateur input
    const { email, password } = req.body;

    // Validate utilisateur input
    if (!(email && password)) {
      res.status(400).send("Tous les champs sont requis");
    }

    // check if utilisateur already exist
    // Validate if utilisateur exist in our database
    const oldUtilisateur = await Utilisateur.findOne({ email });

    if (oldUtilisateur) {
      return res.status(409).send("L'utilisateur existe déjà. Veuillez vous connecter");
    }

    //Encrypt utilisateur password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create utilisateur in our database
    const utilisateur = await Utilisateur.create({
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { utilisateur_id: utilisateur._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save utilisateur token
    utilisateur.token = token;

    // return new utilisateur
    res.status(201).json(utilisateur);
  } catch (err) {
    console.log(err);
  }
});



  // Our register logic ends here
// Se connecter

router.post("/connexion", async (req, res) => {

     // Our login logic starts here
  try {

    await mongoose.connect(process.env.MONGO_URL);
    // Get utilisateur input
    const { email, password } = req.body;

    // Validate utilisateur input
    if (!(email && password)) {
      res.status(400).send("Tous les champs sont requis");
    }
    // Validate if utilisateur exist in our database
    const utilisateur = await Utilisateur.findOne({ email });

    if (utilisateur && (await bcrypt.compare(password, utilisateur.password))) {
      // Create token
      const token = jwt.sign(
        { utilisateur_id: utilisateur._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save utilisateur token
      utilisateur.token = token;

      // utilisateur
      res.status(200).json(utilisateur);
    }
    res.status(400).send("Identifiants invalides");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = router;







