'use server'

import Question from '@/database/question.model'
import Tag from '@/database/tag.model'
import User from '@/database/user.model'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '../mongoose'
import { CreateQuestionParams, GetQuestionsParams } from './shared.types'

export const createQuestion = async (params: CreateQuestionParams) => {
	try {
		connectToDatabase()

		const { title, content, tags, author, path } = params

		const question = await Question.create({ title, content, author })

		const tagDocuments = []

		for (const tag of tags) {
			const existingTag = await Tag.findOneAndUpdate(
				{
					name: { $regex: new RegExp(`^${tag}$`, 'i') },
				},
				{
					$setOnInsert: { name: tag },
					$push: { question: question._id },
				},
				{ upsert: true, new: true }
			)

			tagDocuments.push(existingTag._id)
		}

		await Question.findByIdAndUpdate(question._id, {
			$push: { tags: { $each: tagDocuments } },
		})

		revalidatePath(path)
	} catch (error) {}
}

export async function getQuestions(params: GetQuestionsParams) {
	try {
		connectToDatabase()

		const questions = await Question.find({})
			.populate({
				path: 'tags',
				model: Tag,
			})
			.populate({ path: 'author', model: User })
			.sort({ createdAt: -1 })

		return { questions }
	} catch (err) {
		console.log(err)
	}
}
