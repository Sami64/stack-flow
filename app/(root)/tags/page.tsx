import LocalSearch from '@/components/shared/search/LocalSearch'
import SearchFilter from '@/components/shared/search/SearchFilter'
import { TagFilters } from '@/constants/filters'
import { getAllTags } from '@/lib/actions/tag.action'
import Link from 'next/link'

const Page = async () => {
	const result = await getAllTags({})

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">Tags</h1>
			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearch
					route="/community"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Search for amazing minds"
					otherClassNames="flex-1"
				/>
				<SearchFilter
					filters={TagFilters}
					otherClasses={'min-h-[56px] sm:min-w-[170px]'}
				/>
			</div>
			<section className="mt-12 flex flex-wrap gap-4">
				{result.tags.length > 0 ? (
					result.tags.map((tag) => (
						<Link
							href={`/tags/${tag._id}`}
							key={tag._id}
							className="shadow-light100_darknone">
							<article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
								<div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
									<p className="paragraph-semibold text-dark300_light900">
										{tag.name}
									</p>
								</div>

								<p className="small-medium text-dark400_light500 mt-3.5">
									<span className="body-semibold primary-text-gradient mr-2.5">
										{tag.questions.length}+
									</span>{' '}
									Questions
								</p>
							</article>
						</Link>
					))
				) : (
					<div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
						<p>No tags yet</p>
						<Link
							href="/ask-a-question"
							className="mt-2 font-bold text-accent-blue">
							Create one to be the first!
						</Link>
					</div>
				)}
			</section>
		</>
	)
}

export default Page
