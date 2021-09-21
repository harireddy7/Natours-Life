const express = require('express');
const router = express.Router()

const { protect, restrictTo } = require('../controllers/auth');
const { getAllTours, getTour, createTour, updateTour, deleteTour, aliasTop5Routes, getTourStats, getMonthlyPlan } = require('../controllers/tours');

// router.param('id', checkID)

// Alias route
router.route('/top-5-best-cheap').get(aliasTop5Routes, getAllTours);

// Aggregation route
router.route('/tour-stats').get(getTourStats)

router.route('/monthly-plan/:year').get(getMonthlyPlan)

router.route('/').get(protect, getAllTours).post(createTour)
router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)

module.exports = router;