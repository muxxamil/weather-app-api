'use strict';
const mongoose              = require('mongoose');
const bbPromise                      = require('bluebird');
const paginationHelper = require('../utils/paginationHelper');
var mongoosePaginate = require('mongoose-paginate');

// Define schema
const Schema = mongoose.Schema;
const TemperatureSchema = new Schema({

    temperature:{
        type:Number,
        min: 0.1,
      },
      dateAdded: {
        type: Date,
        default: Date.now
      }

}, { collection: 'temperatures', strict: false });

TemperatureSchema.plugin(mongoosePaginate);

TemperatureSchema.methods.getAverageMinMaxAndTotalCount = function () {
    return bbPromise.all(
    [
        this.model('Temperature').aggregate([
            {
                $group: {
                    _id: null,
                    avgTemperature: { $avg: "$temperature" },
                    maxTemperature: { $max: "$temperature" },
                    minTemperature: { $min: "$temperature" },
                    minTemperature: { $min: "$temperature" },
                }
            }
        ]),
        this.model('Temperature').countDocuments()
    ]);
}

TemperatureSchema.methods.getTemperaturesList = function (params) {
    return this.model('Temperature').paginate({}, {...params, select: "-__v", ...paginationHelper.getPaginationParams(params) });
}

module.exports = mongoose.model('Temperature', TemperatureSchema);