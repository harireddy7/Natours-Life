const express = require("express");
const { getOverview, getTour } = require("../controllers/views");

const router = express.Router();

// router.get('/', (req, res) => {
//     res.status(200).render('base', {
//         title: 'Exciting tours for adventurous people',
//         tour: 'Forest Hiker',
//         user: 'Barry'
//     });
// })

router.get("/", getOverview);

// middleware to add csp for mapbox
const mapboxCSP = (req, res, next) => {
  res.set(
    "Content-Security-Policy",
    "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
  );
  next();
};

router.get("/tour/:slug", mapboxCSP, getTour);

module.exports = router;