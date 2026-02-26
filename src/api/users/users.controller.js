const { deleteFile } = require("../../middlewares/deleteFile");
const { generateSign } = require("../../utils/jwt");
const User = require("./users.model");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
    try {
        if(req.body.rol === "admin"){
            req.body.rol = "user";
        }
        const newUser = new User(req.body);
        if(req.file){
            newUser.image = req.file.path;
        }
        await newUser.save();
        return res.status(201).json(newUser)
    } catch (error) {
        //mandar error a server grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({msg: 'Not Found'});
        }
        if(req.user.rol !== "admin"){
            req.body.rol = "user";
        }
        const idUser = JSON.stringify(req.user.id);     //Revisar si solo paso req.user._id
        const idUserParsed = idUser.slice(1, -1);
        if(req.user.rol === "admin" || idUserParsed === id){
            if(req.file){
                if(user.image){
                    deleteFile(user.image);
                }
                req.body.image = req.file.path;
            }
            if(req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
            }
            const userUpdated = await User.findByIdAndUpdate(id, req.body, {new: true});
            return res.status(201).json(userUpdated);
        }
        else{
            return res.status(403).json({msg: 'Forbbiden'});
        }
    } catch (error) {
        //pasar error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "Not Found" });
    }
    const userToDelete = new User(req.body);
    if (req.user.rol !== "admin") {
      userToDelete.rol = "user";
    }
    if (user.image) {
      deleteFile(user.image);
    }
    const userDeleted = await User.findByIdAndDelete(id);
    return res.status(200).json(userDeleted);
  } catch (error) {
    //pasar error a grafana
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
//CREAR MÉTODO PARA QUE UN USUARIO PUEDA BORRARSE SU CUENTA.
const login = async (req, res) => {
    try{
        const { username, password } = req.body;
        const userToLog = await User.findOne({ username });
        if(!userToLog){
            return res.status(404).json({msg: 'Datos incorrectos'});
        }
        if(bcrypt.compareSync(password, userToLog.password)){
            const token = generateSign(userToLog.id, userToLog.username);
            return res.status(200).json({token, userToLog});
        }
        else{
            return res.status(404).json({msg: 'Datos incorrectos'});
        }
    }
    catch (error) {
        //pasar error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        //pasar error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({msg: 'Not Found'});
        }
        return res.status(200).json(user);
    } catch (error) {
        //pasar error a grafana
        return res.status(500).json({msg: 'Internal Server Error'});
    }
}
const checkSession = async (req, res) => {
    return res.json(req.user)
}

module.exports = {
    signUp,
    updateUser,
    deleteUser,
    login,
    getAllUsers,
    getUserById,
    checkSession
}