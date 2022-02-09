// Imports
let express = require('express');
let router = require('./routes');
let bodyparser = require('body-parser');
let sequelize = require('./config/db_connection');

let app = express();
const PORT = 8080;

// Initialization

// Configuring body parser
app.use(
	bodyparser.urlencoded({
		extended: false,
	})
);

// set view engine
app.set('view engine', 'ejs');

// Setting the router
app.use('/', router);





// Listen
app.listen(PORT, () => {
	console.log('Server is listening on port: ' + PORT);
});