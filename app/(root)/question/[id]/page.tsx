import Answer from '@/components/forms/Answer'
import Metric from '@/components/shared/Metric'
import ParseHtml from '@/components/shared/ParseHtml'
import RenderTag from '@/components/shared/RenderTag'
import { getQuestion } from '@/lib/actions/question.action'
import { formatNumber, getTimestamp } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Page = async ({ params, searchParams }: any) => {
	// const { userId: clerkId } = auth()

	// let mongoUser

	// if (clerkId) {
	// 	mongoUser = await getUserById({ userId: clerkId })
	// }

	const question = await getQuestion({ questionId: params.id })
	return (
		<>
			<div className="flex-start w-full flex-col">
				<div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
					<Link
						className="flex items-center justify-start gap-1"
						href={`/profile/${question.author.clerkId}`}>
						<Image
							className="rounded-full"
							width={22}
							height={22}
							alt="profile"
							src={question.author.picture}
						/>
						<p className="paragraph-semibold text-dark300_light700">
							{question.author.name}
						</p>
					</Link>
					<div className="flex justify-end"></div>
				</div>
				<h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
					{question.title}
				</h2>
			</div>

			<div className="mb-8 mt-5 flex flex-wrap gap-4">
				<Metric
					imgUrl="/assets/icons/clock.svg"
					alt="clock icon"
					value={` asked ${getTimestamp(question.createdAt)}`}
					title=""
					textStyles="small-medium text-dark400_light800"
				/>
				<Metric
					imgUrl="/assets/icons/message.svg"
					alt="answers"
					value={formatNumber(question.answers.length)}
					title=" Answers"
					textStyles="small-medium text-dark400_light800"
				/>
				<Metric
					imgUrl="/assets/icons/eye.svg"
					alt="eye"
					value={formatNumber(question.views)}
					title=" Views"
					textStyles="small-medium text-dark400_light800"
				/>
			</div>

			<ParseHtml data={question.content} />
			<div className="mt-8 flex flex-wrap gap-2">
				{question.tags.map((tag: any) => (
					<RenderTag
						key={tag._id}
						_id={tag._id}
						name={tag.name}
						showCount={false}
					/>
				))}
			</div>

			<Answer />
		</>
	)
}

export default Page
