import QuestionCard from '@/components/cards/QuestionCard'
import HomeFilter from '@/components/home/HomeFilters'
import NoResult from '@/components/shared/NoResult'
import LocalSearch from '@/components/shared/search/LocalSearch'
import SearchFilter from '@/components/shared/search/SearchFilter'
import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import { getQuestions } from '@/lib/actions/question.action'
import Link from 'next/link'

const Home = async () => {
	const result = await getQuestions({})

	return (
		<>
			<div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
				<h1 className="h1-bold text-dark100_light900">All Questions</h1>
				<Link
					href="/ask-a-question"
					className="flex justify-end max-sm:w-full">
					<Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
						Ask a Question
					</Button>
				</Link>
			</div>
			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearch
					imgSrc="/assets/icons/search.svg"
					route={'/'}
					iconPosition={'left'}
					placeholder={'Search questions...'}
					otherClassNames={'flex-1'}
				/>
				<SearchFilter
					filters={HomePageFilters}
					otherClasses={'min-h-[56px] sm:min-w-[170px]'}
					containerClasses={'hidden max-md:flex'}
				/>
			</div>
			<HomeFilter />
			<div className="mt-10 flex w-full flex-col gap-6">
				{result?.questions?.length! > 0 ? (
					result?.questions.map((question) => (
						<QuestionCard
							key={question._id}
							_id={question._id}
							title={question.title}
							tags={question.tags}
							author={question.author}
							upvotes={question.upvotes.length}
							views={question.views}
							answers={question.answers}
							createdAt={question.createdAt}
						/>
					))
				) : (
					<NoResult
						title={'There’s no question to show'}
						description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
				discussion. our query could be the next big thing others learn from. Get
				involved! 💡"
						linkUrl="/ask-a-question"
						linkTitle="Ask a Question"
					/>
				)}
			</div>
		</>
	)
}

export default Home
