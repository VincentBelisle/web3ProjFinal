var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Utilisateur = require('../models/utilisateur');
const { default: mongoose, mongo } = require('mongoose');

// S'inscrire

router.post("/inscription", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("Tous les champs sont requis");
    }

    const oldUtilisateur = await Utilisateur.findOne({ email });

    if (oldUtilisateur) {
      return res.status(409).send("L'utilisateur existe déjà. Veuillez vous connecter");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const utilisateur = await Utilisateur.create({
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { utilisateur_id: utilisateur._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    utilisateur.token = token;

    res.status(201).json(utilisateur);
  } catch (err) {
    console.log(err);
  }
});


// Se connecter

router.post("/connexion", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("Tous les champs sont requis");
    }
    const utilisateur = await Utilisateur.findOne({ email });

    if (utilisateur && (await bcrypt.compare(password, utilisateur.password))) {
      const token = jwt.sign(
        { utilisateur_id: utilisateur._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      utilisateur.token = token;

      res.status(200).json(utilisateur);
    } else {
      return res.status(400).send("Identifiants invalides");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
