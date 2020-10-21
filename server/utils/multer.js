const multer  = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const d = new Date();
      const uniqueTags = d.getFullYear()+"-" + (d.getMonth()+1) + "-" + d.getDate()+"-"+ d.getHours()+"-"+d.getMinutes()+ "-"+d.getSeconds()+ "-"+ d.getMilliseconds(); 
      cb(null, file.fieldname + '-' + uniqueTags+"-" + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });

module.exports = upload;

  
