const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const axios = require('axios');
// var axios = Axios.create({
//     withCredentials: true
// });

module.exports = router

router.get('/getPos', async(req, res) => {
    const pos = req.query;
    var placesResult = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=1500&type=park&keyword=dog&key=AIzaSyCrVxVPta_TOsFatlYL7vOx_stAJNlV8ws`)
    res.json(placesResult.data.results)
})

// router.get('/getPhoto', async(req, res) => {
//     const idan = req.query;
//     console.log('test', idan)
//     var placesResult = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${idan.ref}&key=AIzaSyCrVxVPta_TOsFatlYL7vOx_stAJNlV8ws`)
//     console.log(placesResult.data.)
//     res.json(placesResult.data)
// })