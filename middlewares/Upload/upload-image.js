const multer = require("multer");
const uploadImage = (type) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/images/${type}`); //set chỗ lưu file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname); // đặt lại tene cho file
    },
  });
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const extensionImg = [".png", ".jpg"];
      const extension = file.originalname.slice(-4);
      const check = extensionImg.includes(extension);
      if (check) {
        cb(null, true);
      } else {
        cb(new Error("Invalid"));
      }
    },
  });
  return upload.single(type);
};
export { uploadImage };
