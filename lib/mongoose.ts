import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
	console.log('Connecting to database...')
	mongoose.set('strictQuery', true)

	if (!process.env.MONGODB_URL) return console.log('No MONGODB_URL found')

	if (isConnected) return console.log('MongoDB is already connected')

	try {
		await mongoose.connect(process.env.MONGODB_URL, { dbName: 'cortex' })

		isConnected = true
	} catch (error) {
		console.log('Error connecting to MongoDB', error)
	}
}
