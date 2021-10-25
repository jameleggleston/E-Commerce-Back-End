const router = require('express').Router();
const apiRoutes = require('./api');

//Defining the path for api routes
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

//exporting the roter for server.js file. 
module.exports = router;