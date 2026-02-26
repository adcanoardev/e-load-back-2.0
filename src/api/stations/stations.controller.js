const Station = require("./stations.model");

const createStation = async (req, res) => {
  try {
    const coordinates= {
      lat: req.body.coordinatesLat,
      lng: req.body.coordinatesLng
    }
    req.body = {...req.body, coordinates}
    const newStation = new Station(req.body);
    await newStation.save();
    return res.status(200).json(newStation);
  } catch (error) {
    //pasar el error a grafana
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
const updateStation = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await Station.findById(id);
    if (!station) {
      return res.status(404).json({ msg: "Not Found" });
    }
    const stationUpdated = await Station.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(stationUpdated);
  } catch (error) {
    //pasar el error a grafana
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
const deleteStation = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await Station.findById(id);
    if (!station) {
      return res.status(404).json({ msg: "Not Found" });
    }
    const stationDeleted = await Station.findByIdAndDelete(id);
    return res.status(200).json(stationDeleted);
  } catch (error) {
    //pasar el error a grafana
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
const getAllStations = async (req, res) => {
    try {
        const stations = await Station.find().select('coordinates address');
        return res.status(200).json(stations);
    } catch (error) {
        //pasar el error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
const getAllStationsAdmin = async (req, res) => {
  try {
      const stations = await Station.find().select('address schedule spots');
      return res.status(200).json(stations);
  } catch (error) {
      //pasar el error a grafana
      return res.status(500).json({msg: 'Internal Server Error'});
  }
}
// const getAddressStationById = async (req, res) => {
//   try {
//       const { id } = req.params;
//       const station = await Station.findById(id).select('address');
//       if(!station){
//           return res.status(404).json({msg: 'Not Found'});
//       }
//       return res.status(200).json(station);
//   } catch (error) {
//       //pasar el error a grafana
//       return res.status(500).json({msg: 'Internal Server Error'});
//   }
// }
const getStationById = async (req, res) => {
    try {
        const { id } = req.params;
        const station = await Station.findById(id);
        if(!station){
            return res.status(404).json({msg: 'Not Found'});
        }
        return res.status(200).json(station);
    } catch (error) {
        //pasar el error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}

module.exports = {
    createStation,
    updateStation,
    deleteStation,
    getAllStations,
    getAllStationsAdmin,
    // getAddressStationById,
    getStationById
}