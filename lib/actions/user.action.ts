'use server'

import Question from '@/database/question.model'
import User from '@/database/user.model'
import console from 'console'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '../mongoose'
import {
	CreateUserParams,
	DeleteUserParams,
	GetUserByIdParams,
	UpdateUserParams,
} from './shared.types'

export async function getUserById(params: GetUserByIdParams) {
	try {
		connectToDatabase()

		const { userId } = params

		console.log('User Id', userId)

		const user = await User.findOne({ clerkId: userId })

		return user
	} catch (error) {
		console.log('[GET_USER_BY_ID ERROR]', error)
	}
}

export async function createUser(userData: CreateUserParams) {
	try {
		connectToDatabase()

		const newUser = await User.create(userData)

		return newUser
	} catch (error) {
		console.log('User Action Error[CREATE]: ', error)
		throw error
	}
}

export async function updateUser(params: UpdateUserParams) {
	try {
		connectToDatabase()

		const { clerkId, updateData, path } = params

		await User.findOneAndUpdate({ clerkId }, updateData, { new: true })

		revalidatePath(path)
	} catch (error) {
		console.log('User Action Error[UPDATE]: ', error)
		throw error
	}
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
	} catch (error) {
		console.log('User Action Error[DELETE]: ', error)
		throw error
	}
}
