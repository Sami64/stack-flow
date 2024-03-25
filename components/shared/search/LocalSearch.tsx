'use client'

import { Input } from '@/components/ui/input'
import Image from 'next/image'

interface CustomLocalSearchProps {
	route: string
	iconPosition: 'left' | 'right'
	placeholder: string
	otherClassNames: string
	imgSrc: string
}

const LocalSearch = ({
	route,
	iconPosition,
	placeholder,
	otherClassNames,
	imgSrc,
}: CustomLocalSearchProps) => {
	return (
		<div
			className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 ${otherClassNames}`}>
			{iconPosition === 'left' && (
				<Image
					src={imgSrc}
					width={24}
					height={24}
					alt="search"
					className="cursor-pointer"
				/>
			)}
			<Input
				type="text"
				placeholder={placeholder}
				value=""
				onChange={() => {}}
				className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
			/>
			{iconPosition === 'right' && (
				<Image
					src={imgSrc}
					width={24}
					height={24}
					alt="search"
					className="cursor-pointer"
				/>
			)}
		</div>
	)
}

export default LocalSearch
