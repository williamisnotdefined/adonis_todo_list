'use strict'

const Task = use('App/Models/Task')
const { validateAll } = use('Validator')

class TaskController {

	async index({ view }) {

		const tasks =  await Task.all()

		return view.render("tasks", {
			title: "Yours tasks:",
			tasks: tasks.toJSON()
		});

	}

	async store({ request, response, session }) {

		const message = {
			'title.required': "Title is required.",
			'title.min': "Title need min 5 chars.",
			'title.max': "Title need max 120 chars.",
		}

		const validation = await validateAll(request.all(), {
			title: 'required|min:5|max:120',
			description: 'required|min:10|max:500'
		}, message)

		if (validation.fails()) {
			session.withErrors(validation.messages()).flashAll()
			return response.redirect('back')
		}

		const task = new Task();

		task.title = request.input('title')
		task.description = request.input('description')

		await task.save()

		session.flash({
			notification: `Task "${task.title}" added!`
		})

		return response.redirect('/');

	}


	async detail({ params, view }) {

		const task = await Task.find(params.id)

		return view.render('detail', {
			task
		})

	}

	async remove({ params, response, session }) {
		const task = await Task.find(params.id)
		await task.delete()

		session.flash({ notification: `Task "${task.title}" removed.`})

		return response.redirect('/')
	}
}

module.exports = TaskController
