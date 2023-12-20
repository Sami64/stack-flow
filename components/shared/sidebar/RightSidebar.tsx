import Image from 'next/image'
import Link from 'next/link'
import RenderTag from '../RenderTag'

const popularTags = [
	{ _id: 1, name: 'javascript', totalQuestions: 5 },
	{ _id: 2, name: 'next', totalQuestions: 55 },
	{ _id: 3, name: 'vue', totalQuestions: 25 },
	{ _id: 4, name: 'react', totalQuestions: 15 },
]

const RightSidebar = () => {
	return (
		<section className="background-light900_dark200 light-border custom-scrollbar right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]">
			{/** Top Questions */}
			<div className="flex flex-col justify-between gap-3">
				<h3 className="h3-bold text-dark200_light900">Top Questions</h3>
				<div className="mt-7 flex w-full flex-col gap-[30px]">
					<Link
						href="/"
						className="flex cursor-pointer items-center justify-between gap-7">
						<p className="body-medium text-dark500_light700">
							Can I get the course for free?
						</p>
						<Image
							src="/assets/icons/chevron-right.svg"
							alt="chevron right"
							width={20}
							height={20}
							className="invert-colors"
						/>
					</Link>
				</div>
			</div>
			{/** Popular Tags */}
			<div className="mt-16 flex flex-col justify-between gap-3">
				<h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
				<div className="mt-7 flex flex-col gap-4">
					{popularTags.map((tag) => (
						<RenderTag
							key={tag._id}
							_id={tag._id}
							name={tag.name}
							totalQuestions={tag.totalQuestions}
                            showCount
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default RightSidebar