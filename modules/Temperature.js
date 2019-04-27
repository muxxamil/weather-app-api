'use strict';
const _ = require('lodash');
const Temperature = require('../models/Temperature');

const temperatureModule = {};

temperatureModule.getStatistics = async () => {
    try {
        const temperatureObj = new Temperature();
        const [statistics, totalCount] = await temperatureObj.getAverageMinMaxAndTotalCount();
    
        let medianValues = {docs: [ { temperature: null } ]};
        
        if(totalCount > 1) {
            const params = { offset: _.ceil(totalCount / 2) - 1, limit: 1, sort: { temperature: 1 } }
    
            if((totalCount / 2) % 1 == 0) {
                params.limit = 2;
            }
        
            medianValues = await temperatureObj.getTemperaturesList(params);
        }
    
        const medianNumber = _.meanBy(medianValues.docs, "temperature");
        return _.mergeWith({
            avgTemperature: null,
            maxTemperature: null,
            minTemperature: null,
            medianTemperature: null,
        },
        {
            ..._.pick(_.first(statistics), ["avgTemperature", "maxTemperature", "minTemperature"]),
            medianTemperature: medianNumber > 0 ? medianNumber : null
        });
    } catch (error) {
        throw error;        
    }
}

module.exports = temperatureModule;
