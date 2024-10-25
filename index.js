
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();



// cors allow cors
app.use(cors('*'))

app.use(cors());

app.use(express.json());

//Install dotenv module
dotenv.config();


// Variable to hold port
var port = process.env.PORT || 8070;

// USE ALL ROUTES
app.get('/', (req, res) => {
    res.send('Hey API running 🥳')
})

app.use("/status",(req,res) => {
    res.send({status: "OK"});
})


mongoose.connect(process.env.LIVE_DB, { useUnifiedTopology: true, useNewUrlParser: true,}, (err,res) => {
    if(err){
        console.log(err)
    }
    else{
      console.log('Connected to Database');
    }
});

// by default, you need to set it to false.
mongoose.set('useFindAndModify', true);


app.listen(8070, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Project is running on port ${port}`)
    }
})
