'use server'

import Tag from '@/database/tag.model'
import User from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import { GetAllTagsParams, GetTopInteractedTagsParams } from './shared.types'

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
	try {
		connectToDatabase()

		const { userId } = params

		const user = await User.findById(userId)

		if (!user) throw new Error('User not found')

		return [
			{ _id: 'sa', name: 'tag 1' },
			{ _id: 's1a', name: 'tag 2' },
			{ _id: 'sa2', name: 'tag 3' },
		]
	} catch (err) {
		console.log('[GET_TOP_INTERACTED_TAGS ERROR]', err)
		throw new Error('Error getting top interacted tags')
	}
}

export async function getAllTags(params: GetAllTagsParams) {
	try {
		connectToDatabase()

		// const { page = 1, pageSize = 20, filter, searchQuery } = params

        const tags = await Tag.find({})

		return { tags }
	} catch (err) {
		console.log('[GET_ALL_TAGS ERROR]', err)
		throw new Error('Error getting all tags')
	}
}
