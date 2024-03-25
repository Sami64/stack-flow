import { Document, Schema, model, models } from 'mongoose'

export interface IAnswer extends Document {
    author: Schema.Types.ObjectId
    upvotes: Schema.Types.ObjectId[]
    downvotes: Schema.Types.ObjectId[]
    content: string
    question: Schema.Types.ObjectId
    createdAt: Date
}

const AnswerSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    upvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    content: {type: String, required: true},
    question: {type: Schema.Types.ObjectId, ref: 'Question'},
    createdAt: {type: Date, default: Date.now}
})

const Answer = models.Answer || model('Answer', AnswerSchema)

export default Answer