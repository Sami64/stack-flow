'use server'

import Answer from '@/database/answer.model'
import Question from '@/database/question.model'
import Tag from '@/database/tag.model'
import User from '@/database/user.model'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '../mongoose'
import {
	AnswerVoteParams,
	CreateQuestionParams,
	GetQuestionByIdParams,
	GetQuestionsParams,
	QuestionVoteParams,
} from './shared.types'

export const createQuestion = async (params: CreateQuestionParams) => {
	try {
		await connectToDatabase()

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
	} catch (error) { }
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

export async function getQuestion(params: GetQuestionByIdParams) {
	try {
		connectToDatabase()

		const { questionId } = params

		const question = await Question.findById(questionId)
			.populate({
				path: 'tags',
				model: 'Tag',
				select: '_id name',
			})
			.populate({
				path: 'author',
				model: 'User',
				select: '_id clerkId name picture',
			})

		return question
	} catch (err) {
		console.log(err)
		throw new Error('Error getting question')
	}
}

export async function upvoteQuestion(params: QuestionVoteParams) {
	try {
		connectToDatabase()

		const { userId, hasupVoted, hasdownVoted, path, questionId } = params

		let updateQuery = {}

		if (hasupVoted) {
			updateQuery = {
				$pull: { upvotes: userId }
			}

		} else if (hasdownVoted) {
			updateQuery = {
				$push: { upvotes: userId },
				$pull: { downvotes: userId }
			}

		} else {
			updateQuery = {
				$addToSet: { upvotes: userId }
			}
		}

		const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

		if (!question) throw new Error('Question not found')

		revalidatePath(path)
	} catch (error) {
		console.log(error)
		throw new Error('Error getting question')
	}
}

export async function upvoteAnswer(params: AnswerVoteParams) {
	try {
		connectToDatabase()

		const { userId, hasupVoted, hasdownVoted, path, answerId } = params

		let updateQuery = {}

		if (hasupVoted) {
			updateQuery = {
				$pull: { upvotes: userId }
			}

		} else if (hasdownVoted) {
			updateQuery = {
				$push: { upvotes: userId },
				$pull: { downvotes: userId }
			}

		} else {
			updateQuery = {
				$addToSet: { upvotes: userId }
			}
		}

		const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

		if (!answer) throw new Error('Answer not found')

		revalidatePath(path)
	} catch (error) {
		console.log(error)
		throw new Error('Error getting answer')
	}
}

export async function downvoteQuestion(params: QuestionVoteParams) {
	try {
		connectToDatabase()

		const { userId, hasupVoted, hasdownVoted, path, questionId } = params

		let updateQuery = {}

		if (hasdownVoted) {
			updateQuery = {
				$pull: { downvotes: userId }
			}
		} else if (hasupVoted) {
			updateQuery = {
				$push: { downvotes: userId },
				$pull: { upvotes: userId }
			}
		} else {
			updateQuery = {
				$addToSet: { downvotes: userId }
			}
		}

		const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

		if (!question) throw new Error('Question not found')

		revalidatePath(path)
	} catch (error) {
		console.log(error)
		throw new Error('Error getting question')
	}
}

export async function downvoteAnswer(params: AnswerVoteParams) {
	try {
		connectToDatabase()

		const { userId, hasupVoted, hasdownVoted, path, answerId } = params

		let updateQuery = {}

		if (hasdownVoted) {
			updateQuery = {
				$pull: { downvotes: userId }
			}
		} else if (hasupVoted) {
			updateQuery = {
				$push: { downvotes: userId },
				$pull: { upvotes: userId }
			}
		} else {
			updateQuery = {
				$addToSet: { downvotes: userId }
			}
		}

		const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

		if (!answer) throw new Error('Answer not found')

		revalidatePath(path)
	} catch (error) {
		console.log(error)
		throw new Error('Error getting answer')
	}
}