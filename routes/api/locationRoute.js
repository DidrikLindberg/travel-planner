const router = require('express').Router();
const { Location, Traveller, Trip } = require('../../models');

// GET all locations
router.get('/', async (req, res) => {
    try {
        const locationData = await Location.findAll();{
            console.log(locationData);
            const locations = locationData.map((location) => location.get({ plain: true }));
            console.log("locations", locations);
            res.status(200).json(locationData);
            console.log()
        } 
    } catch (err) {
        res.status(500).json(err);
        }});


// GET a single location and join with travellers
router.get('/:id', async (req, res) => {
    try {
        const locationData = await Location.findByPk(req.params.id, {
        // JOIN with travellers, using the Trip through table
        // needs to match your alias set - 'location_travellers'
        include: [{ model: Traveller, through: Trip, as: 'location_travellers' }]
        });
    
        if (!locationData) {
        res.status(404).json({ message: 'No location found with this id!' });
        return;
        }
    
        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
    });

    // CREATE a location
router.post('/', async (req, res) => {
    try {
      const locationData = await Location.create(req.body);
      res.status(200).json(locationData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // DELETE a location
router.delete('/:id', async (req, res) => {
    try {
      const locationData = await Location.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!locationData) {
        res.status(404).json({ message: 'No location found with this id!' });
        return;
      }
  
      res.status(200).json(locationData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;