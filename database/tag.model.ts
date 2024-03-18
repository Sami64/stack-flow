import { Document, Schema, model, models } from 'mongoose'

export interface ITag extends Document {
	name: string
	description: string
	questions: Schema.Types.ObjectId[]
	followers: Schema.Types.ObjectId[]
	createdOn: Date
}

const TagSchema = new Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
	createdOn: { type: Date, default: Date.now },
	followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

const Tag = models.Tag || model('Tag', TagSchema)

export default Tag
