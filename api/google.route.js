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
    var placesResult = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.lat},${pos.lng}&radius=2000&type=park&keyword=dog&key=`)
    res.json(placesResult.data.results)
})

router.get('/getDistance', async(req, res) => {
    const distance = req.query;
    var placesResult = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${distance.dist}&destinations=${distance.userdist}&key=`)
        // console.log(placesResult.data.rows[0])
    res.json(placesResult.data.rows[0])
})


//AIzaSyDg8EFZZ2HBS2X6aqRzwRwfEbPO9SJLPfc