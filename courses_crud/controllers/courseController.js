const sequelize = require('../config/db_connection');
const table = require('../models/course');

module.exports = {
	index: (req, res) => {

		return sequelize.sync().then(() => {

			return table.findAll({
				raw: true,
				//Other parameters
			})

		}).then(courses => {

			console.log(courses);
			res.render('pages/index', {
				courses: courses
			});
			
		}).catch((err) => {
			console.log(err);


		});

		
	},
	add: (req, res) => {
		res.render('pages/addCourse');
	},
	edit: (req, res) => {
		res.render('pages/editCourse');
	},

	insert: (req, res) => {
		var crd = req.body;
		sequelize.sync().then(result => {
			console.log(result);
			return table.create({
				Course_name: crd.name,
				Course_Duration: crd.duration,
				Course_Fees: crd.fees,
			}).then((courses) => {
				console.log("courses added succesfully:", courses);
				res.redirect('/');
			});


		});

	}

};