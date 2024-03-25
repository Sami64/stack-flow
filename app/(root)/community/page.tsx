import UserCard from '@/components/cards/UserCard'
import NoResult from '@/components/shared/NoResult'
import LocalSearch from '@/components/shared/search/LocalSearch'
import SearchFilter from '@/components/shared/search/SearchFilter'
import { UserFilters } from '@/constants/filters'
import { getUsers } from '@/lib/actions/user.action'

const CommunityPage = async () => {
	const result = await getUsers({})

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">All Users</h1>
			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearch
					route="/community"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Search for amazing minds"
					otherClassNames="flex-1"
				/>
				<SearchFilter
					filters={UserFilters}
					otherClasses={'min-h-[56px] sm:min-w-[170px]'}
				/>
			</div>
			<section className="mt-12 flex flex-wrap gap-4">
				{result.users.length > 0 ? (
					result.users.map((user) => (
						<UserCard
							key={user._id}
							user={user}
						/>
					))
				) : (
					<NoResult
						title="No Tags Found"
						description="It looks like there are no tags found."
						linkUrl="/ask-question"
						linkTitle="Ask a question"
					/>
				)}
			</section>
		</>
	)
}

export default CommunityPage
