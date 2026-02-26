const cloudinary = require("cloudinary").v2

const deleteFile = (imgUrl) => {
    const imgSplitted = imgUrl.split("/");
    const nameSplitted = imgSplitted.at(-1).split(".");
    const folderSplitted = imgSplitted.at(-2);
    const public_id = `${folderSplitted}/${nameSplitted[0]}`;
    cloudinary.uploader.destroy(public_id, () => {
        console.log("Eliminado correctamente");
    });
}

module.exports = { deleteFile }