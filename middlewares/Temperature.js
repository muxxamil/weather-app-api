'use strict';
const _ = require('lodash');
const mongoose = require('mongoose');

const temperatureMiddleware = {};

temperatureMiddleware.addTemperature = async (req, res, next) => {
    
    try {
        const temperature = parseFloat(_.get(req.body, "temperature", 0));
        if (!_.isNumber(temperature) || temperature <= 0) {
            return res.status(400).send({message: req.app.locals.translation.VALIDATION_ERROR.INVALID_TEMPERATURE});
        }
        next();
        
    } catch (error) {
        next(error);
    }

}

temperatureMiddleware.deleteTemperature = async (req, res, next) => {
    
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send({message: req.app.locals.translation.VALIDATION_ERROR.INVALID_ID});
        }
        next();
        
    } catch (error) {
        next(error);
    }

}

module.exports = temperatureMiddleware;
