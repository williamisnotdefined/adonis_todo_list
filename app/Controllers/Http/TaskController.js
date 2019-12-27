'use strict'

class TaskController {

	index({ view }) {

		const tasks = [
			{name: "Task one", description: "This is task one."},
			{name: "Task two", description: "This is task two."},
		];

		return view.render("tasks", {
			title: "Yours tasks:",
			tasks
		});
	}

}

module.exports = TaskController
