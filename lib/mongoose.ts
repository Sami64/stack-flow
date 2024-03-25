import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
	if (isConnected) return console.log('MongoDB is already connected')

	console.log('Connecting to database...')
	mongoose.set('strictQuery', true)

	if (!process.env.MONGODB_URL) return console.log('No MONGODB_URL found')

	try {
		await mongoose.connect(process.env.MONGODB_URL, { dbName: 'cortex' })

		isConnected = true
	} catch (error) {
		console.log('Error connecting to MongoDB', error)
	}
}
