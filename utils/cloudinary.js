const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "enter your clound name",
  api_key: "enter your key",
  api_secret: "enter your secret",
});

const uploadImage = async (filePath) => {
  const response = await cloudinary.uploader.upload(filePath);
  return response;
};

module.exports = {
    uploadImage,
}