import { formatNumber, getTimestamp } from '@/lib/utils'
import Link from 'next/link'
import Metric from '../shared/Metric'
import RenderTag from '../shared/RenderTag'

interface QuestionProps {
	_id: number
	title: string
	tags: {
		_id: string
		name: string
	}[]
	author: {
		_id: string
		name: string
		picture: string
	}
	upvotes: number
	views: number
	answers: Array<object>
	createdAt: Date
}

const QuestionCard = ({
	_id,
	title,
	tags,
	author,
	upvotes,
	views,
	answers,
	createdAt,
}: QuestionProps) => {
	return (
		<div className="card-wrapper flex w-full flex-col rounded-[10px] p-9 sm:px-11">
			<div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
				<div>
					<span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
						{getTimestamp(createdAt)}
					</span>
					<Link href={`/question/${_id}`}>
						<h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
							{title}
						</h3>
					</Link>
				</div>
			</div>

			<div className="mt-3.5 flex flex-wrap gap-2">
				{tags.map((tag) => (
					<RenderTag
						key={tag._id}
						_id={tag._id}
						name={tag.name}
					/>
				))}
			</div>

			<div className="flex-between mt-6 w-full flex-wrap gap-3">
				<Metric
					imgUrl={author.picture}
					alt="user"
					value={author.name}
					title={` - asked ${getTimestamp(createdAt)}`}
					isAuthor
					href={`/profile/${author._id}`}
					textStyles="body-medium text-dark400_light700"
				/>
				<Metric
					imgUrl="/assets/icons/like.svg"
					alt="upvotes"
					value={formatNumber(upvotes)}
					title=" Upvotes"
					textStyles="small-medium text-dark400_light800"
				/>
				<Metric
					imgUrl="/assets/icons/message.svg"
					alt="message"
					value={formatNumber(answers.length)}
					title=" Answers"
					textStyles="small-medium text-dark400_light800"
				/>
				<Metric
					imgUrl="/assets/icons/eye.svg"
					alt="eye"
					value={formatNumber(views)}
					title=" Views"
					textStyles="small-medium text-dark400_light800"
				/>
			</div>
		</div>
	)
}

export default QuestionCard
