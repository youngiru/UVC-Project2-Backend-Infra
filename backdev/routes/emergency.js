const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const emergencyService = require('../service/emergencyService');
