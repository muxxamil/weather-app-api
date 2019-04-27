'use strict';
const _ = require('lodash');
const defaults = require('../config/defaults');

const paginationHelper = {};

paginationHelper.getPaginationParams = (body) => {
    return { page: parseInt(_.get(body, 'page', defaults.PAGE)), limit: parseInt(_.get(body, 'limit', defaults.LIMIT)) }
}

module.exports = paginationHelper;
