import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getTimestamp = (createdAt: Date): string => {
	const now = new Date()
	const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000)

	let value: number
	let unit: string

	if (diffInSeconds < 60) {
		// less than 1 minute
		return 'just now'
	} else if (diffInSeconds < 3600) {
		// less than 1 hour
		value = Math.floor(diffInSeconds / 60)
		unit = value === 1 ? 'minute' : 'minutes'
	} else if (diffInSeconds < 86400) {
		// less than 1 day
		value = Math.floor(diffInSeconds / 3600)
		unit = value === 1 ? 'hour' : 'hours'
	} else if (diffInSeconds < 604800) {
		// less than 1 week
		value = Math.floor(diffInSeconds / 86400)
		unit = value === 1 ? 'day' : 'days'
	} else if (diffInSeconds < 2629746) {
		// less than 1 month (approx)
		value = Math.floor(diffInSeconds / 604800)
		unit = value === 1 ? 'week' : 'weeks'
	} else if (diffInSeconds < 31556952) {
		// less than 1 year (approx)
		value = Math.floor(diffInSeconds / 2629746)
		unit = value === 1 ? 'month' : 'months'
	} else {
		value = Math.floor(diffInSeconds / 31556952)
		unit = value === 1 ? 'year' : 'years'
	}

	return `${value} ${unit} ago`
}

export const formatNumber = (num: number): string => {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M'
	} else if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K'
	} else {
		return num.toString()
	}
}
