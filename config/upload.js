const path = require('path');

module.exports={
    createParentPath: true,
    useTempFiles : true,
    tempFileDir : path.join(__dirname, '/storage/tmp/'),
    limits: { fileSize: 5 * 1024 * 1024 }, //-- 5mb
}