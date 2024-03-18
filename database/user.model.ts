import { Document, Schema, model, models } from 'mongoose'

export interface IUser extends Document {
	clerkId: string
	email: string
	name: string
	username: string
	bio?: string
	location?: string
	portfolioWebsite?: string
	password?: string
	picture: string
	saved: Schema.Types.ObjectId[]
	joinedAt: Date
	reputation?: number
}

const UserSchema = new Schema({
	clerkId: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	bio: { type: String },
	location: { type: String },
	portfolioWebsite: { type: String },
	saved: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
	joinedAt: { type: Date, default: Date.now },
	reputation: { type: Number, default: 0 },
	password: { type: String },
	picture: { type: String, required: true },
})

const User = models.User || model('User', UserSchema)

export default User
