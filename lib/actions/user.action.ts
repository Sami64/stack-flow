'use server'

import Question from '@/database/question.model'
import User from '@/database/user.model'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '../mongoose'
import {
	CreateUserParams,
	DeleteUserParams,
	UpdateUserParams,
} from './shared.types'

export async function getUserById(params: any) {
	try {
		connectToDatabase()

		const { userId } = params

		const user = await User.findOne({ clerkId: userId })

		return user
	} catch (error) {
		console.log(error)
	}
}

export async function createUser(userData: CreateUserParams) {
	try {
		connectToDatabase()

		const newUser = await User.create(userData)

		return newUser
	} catch (error) {}
}

export async function updateUser(params: UpdateUserParams) {
	try {
		connectToDatabase()

		const { clerkId, updateData, path } = params

		await User.findOneAndUpdate({ clerkId }, updateData, { new: true })

		revalidatePath(path)
	} catch (error) {}
}

export async function deleteUser(params: DeleteUserParams) {
	try {
		connectToDatabase()

		const { clerkId } = params

		const user = await User.findOneAndDelete({ clerkId })

		if (!user) {
			throw new Error('User not found')
		}

		// const userQuestionsIds = await Question.find({ author: user._id }).distinct(
		// 	'_id'
		// )

		// Delete user questions
		await Question.deleteMany({ author: user._id })
	} catch (error) {}
}
