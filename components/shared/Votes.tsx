'use client'

import {
	downvoteAnswer,
	downvoteQuestion,
	upvoteAnswer,
	upvoteQuestion,
} from '@/lib/actions/question.action'
import { formatNumber } from '@/lib/utils'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface Props {
	type: string
	itemId: string
	userId: string
	upvotes: number
	hasupVoted: boolean
	downvotes: number
	hasdownVoted: boolean
	hasSaved?: boolean
}

const Votes = ({
	type,
	itemId,
	userId,
	upvotes,
	hasupVoted,
	downvotes,
	hasdownVoted,
	hasSaved,
}: Props) => {
	const pathname = usePathname()
	// const router = useRouter()

	const handleVote = async (action: string) => {
		if (!userId) return

		if (action === 'upvote') {
			if (type === 'Question')
				await upvoteQuestion({
					userId: JSON.parse(userId),
					hasupVoted,
					hasdownVoted,
					questionId: JSON.parse(itemId),
					path: pathname,
				})
			else if (type === 'Answer') {
				await upvoteAnswer({
					userId: JSON.parse(userId),
					hasupVoted,
					hasdownVoted,
					answerId: JSON.parse(itemId),
					path: pathname,
				})
			}

			return
		}

		if (action === 'downvote') {
			if (type === 'Question')
				await downvoteQuestion({
					userId: JSON.parse(userId),
					hasupVoted,
					hasdownVoted,
					questionId: JSON.parse(itemId),
					path: pathname,
				})
			else if (type === 'Answer') {
				await downvoteAnswer({
					userId: JSON.parse(userId),
					hasupVoted,
					hasdownVoted,
					answerId: JSON.parse(itemId),
					path: pathname,
				})
			}
		}
	}

	const handleSave = () => {}
	return (
		<div className="flex gap-5">
			<div className="flex-center gap-2.5">
				<div className="flex-center gap-1.5">
					<Image
						alt="upvotes"
						src={
							hasupVoted
								? '/assets/icons/upvoted.svg'
								: '/assets/icons/upvote.svg'
						}
						width={18}
						height={18}
						className="cursor-pointer"
						onClick={() => handleVote('upvote')}
					/>
					<div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
						<p className="subtle-medium text-dark400_light900">
							{formatNumber(upvotes)}
						</p>
					</div>
				</div>
				<div className="flex-center gap-1.5">
					<Image
						alt="downvotes"
						src={
							hasdownVoted
								? '/assets/icons/downvoted.svg'
								: '/assets/icons/downvote.svg'
						}
						width={18}
						height={18}
						className="cursor-pointer"
						onClick={() => handleVote('downvote')}
					/>
					<div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
						<p className="subtle-medium text-dark400_light900">
							{formatNumber(downvotes)}
						</p>
					</div>
				</div>
			</div>
			{hasSaved && (
				<Image
					alt="save"
					src={
						hasSaved
							? '/assets/icons/star-filled.svg'
							: '/assets/icons/star-red.svg'
					}
					width={18}
					height={18}
					className="cursor-pointer"
					onClick={() => handleSave()}
				/>
			)}
		</div>
	)
}

export default Votes
