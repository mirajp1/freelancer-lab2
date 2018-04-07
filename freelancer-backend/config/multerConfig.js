const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');

// configure storage
const projectStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/project');
    },
    filename: (req, file, cb) => {
        /*
          uuidv4() will generate a random ID that we'll use for the
          new filename. We use path.extname() to get
          the extension from the original file name and add that to the new
          generated ID. These combined will create the file name used
          to save the file on the server and will be available as
          req.file.pathname in the router handler.
        */
        console.log("file"+file);
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    },
});

const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/profile');
    },
    filename: (req, file, cb) => {
        /*
          uuidv4() will generate a random ID that we'll use for the
          new filename. We use path.extname() to get
          the extension from the original file name and add that to the new
          generated ID. These combined will create the file name used
          to save the file on the server and will be available as
          req.file.pathname in the router handler.
        */
        console.log("file"+file);
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    },
});

// create the multer instance that will be used to upload/save the file
const ProjectUpload = multer({ storage:projectStorage });
const ProfileUpload = multer({ storage:profileStorage });

module.exports.projectMulter = ProjectUpload;
module.exports.profileMulter = ProfileUpload;