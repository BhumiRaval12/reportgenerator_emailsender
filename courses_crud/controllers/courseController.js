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

	},

	add: (req, res) => {
		res.render('pages/addCourse');
	},


	// edit 

	getEdit: (req, res) => {
		table.findAll({
			where: {
				id: req.params.id
			}
		}).then((course) => {

			res.render('pages/editCourse', {
				Courses: course
			}).catch((err) => {
				console.log(err)
			});
		})
	},
	edit: (req, res) => {
		table.update({
			Course_name: req.body.C_Name,
			Course_Duration: req.body.C_dur,
			Course_Fees: req.body.C_Fees

		}, {
			where: {
				id: req.body.id
			}
		}).then((course) => {
			console.log('course update successfully');

			res.redirect('/');

		})
	},
	delete: (req, res) => {
		table.destroy({
			where: {
				id: req.params.id
			}

		}).then(course => {
			res.redirect('/');
		}).catch((err) => {
			console.log(err)
		});
	}


}