'use strict';

const express                       = require('express');
const router                        = express.Router();
const mongoose                      = require('mongoose');
const temperatureModule         = require('../modules/Temperature');
const temperatureMiddleware         = require('../middlewares/Temperature');
const Temperature = require('../models/Temperature');

router.get('/', async (req, res, next) => {
    try {
        res.status(200).send(await new Temperature().getTemperaturesList({ ...req.query, sort: "-_id" }));
    } catch (error) { next(error); }
});

router.get('/statistics', async (req, res, next) => {
    try {
        res.status(200).send(await temperatureModule.getStatistics());
    } catch (error) { 
        next(error); 
    }
});

router.post('/', temperatureMiddleware.addTemperature, async (req, res, next) => {
    try {
        let temperatureObj = new Temperature({temperature: req.body.temperature});
        return res.status(200).send(await temperatureObj.save());
    } catch (error) { 
        next(error); 
    }
});

router.delete('/:id', temperatureMiddleware.deleteTemperature, async (req, res, next) => {
    try {
        return res.status(200).send(await Temperature.remove({ _id: req.params.id }));
    } catch (error) { 
        next(error); 
    }
});

module.exports = router;
