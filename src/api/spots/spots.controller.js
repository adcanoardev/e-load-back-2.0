const Station = require("../stations/stations.model");
const User = require("../users/users.model");
const Spot = require("./spots.model");

const createSpot = async (req, res) => {
    try {
        const newSpot = new Spot(req.body);
        const stationId = req.body.station;
        await newSpot.save();
        await Station.findByIdAndUpdate(stationId, {$push: {spots: newSpot._id}})
        return res.status(200).json(newSpot);
    } catch (error) {
        //pasar el error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
const updateSpot = async (req, res) => {
    try {
        const { id } = req.params;
        const spot = await Spot.findById(id);
        if(!spot){
            return res.status(404).json({msg: 'Not Found'});
        }
        const spotUpdated = await Spot.findByIdAndUpdate(id, req.body, {new: true});
        return res.status(200).json(spotUpdated);
    } catch (error) {
        //pasar el error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
const deleteSpot = async (req, res) => {
    try {
        const { id } = req.params;
        const spot = await Spot.findById(id);
        if(!spot){
            return res.status(404).json({msg: 'Not Found'});
        }
        const stationId = spot.station.toString();
        await Station.findByIdAndUpdate(stationId, {$pull: {spots: spot._id}});
        const spotDeleted = await Spot.findByIdAndDelete(id);
        return res.status(200).json(spotDeleted);
    } catch (error) {
        //pasar el error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
const getAllSpots = async (req, res) => {
    try {
        const spots = await Spot.find();
        return res.status(200).json(spots);
    } catch (error) {
        //pasar el error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
const getAllSpotsByStation = async (req, res) => {
    try {
        const { id } = req.params;
        const station = await Station.findById(id).populate('spots');
        if(!station){
            return res.status(404).json({msg: 'Not Found'});
        }
        const spots = station.spots;
        return res.status(200).json(spots);
    } catch (error) {
        //pasar el error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
const getAllSpotsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('spots');
        if(!user){
            return res.status(404).json({msg: 'Not Found'});
        }
        const spots = user.spots;
        return res.status(200).json(spots);
    } catch (error) {
        //pasar el error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
const getSpotById = async (req, res) => {
    try {
        const { id } = req.params;
        const spot = await Spot.findById(id);
        if(!spot){
            return res.status(404).json({msg: 'Not Found'});
        }
        return res.status(200).json(spot);
    } catch (error) {
        //pasar el error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}

module.exports = {
    createSpot,
    updateSpot,
    deleteSpot,
    getAllSpots,
    getAllSpotsByStation,
    getAllSpotsByUser,
    getSpotById
}