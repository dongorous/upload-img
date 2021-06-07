const express = require('express');
const cors = require('cors')
const bodyparser = require ('body-parser');
const multiparty = require('connect-multiparty');
const { error } = require('console');

const path = require('path');

const fs = require('fs');



const app = express();

app.use(cors())

const MuiltiPartyMiddleware = multiparty({uploadDir:"./images"});
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


app.get('/', ( req, res) =>{
    res.status(200).json(
        {
            message: "Data Ready And server Also"
        }
    )
});

app.use('/uploads', express.static('uploads'));

app.post('/upload', MuiltiPartyMiddleware, (req, res) =>{
    
    var TempFile = req.files.upload;
    var TempPathfile = TempFile.path;

   const targetPathUrl = path.join(__dirname,"./uploads/"+TempFile.name);

   console.log(TempFile, "aaaaaaaaaaaaaaaaaaaaa")

   if(path.extname(TempFile.originalFilename).toLowerCase() === ".png" || ".jpg" || ".jpeg"){
     
    fs.rename(TempPathfile, targetPathUrl, err =>{
        
        res.status(200).json({
            uploaded: true,
            url: `https://ck-upload.herokuapp.com/uploads/${TempFile.name}`
        });

        if(err) return console.log(err);
    })
   }
})


app.listen(console.log(`Server Started at PORT : 5000`))