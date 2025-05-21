const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();


router.get('/', auth, (req, res) => {
  
  const ships = [
    { name: 'Titanic', type: 'Cruise', country: 'UK' },
    { name: 'USS Enterprise', type: 'Aircraft Carrier', country: 'USA' },
    { name: 'INS Vikrant', type: 'Carrier', country: 'India' }
  ];

  res.json({ ships });
});

module.exports = router;
