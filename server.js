//dependencies 
const express = require('express');

//app use express
const app = express();

const PORT = process.env.PORT || 3001;

//asks Express to create a route for every file in the 'public' folder and give it a '/' route
app.use(express.static('public'));
//sets up Express app to handel data parser, middleware created req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());



//app listener 
app.listen(PORT, () => {
    console.log(`Express server listening at ${PORT} `)
});
