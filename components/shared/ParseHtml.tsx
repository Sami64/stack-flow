'use client'

import { useEffect } from 'react'

import parse from 'html-react-parser'
import * as Prism from 'prismjs'

interface Props {
	data: string
}

const ParseHtml = ({ data }: Props) => {
	useEffect(() => {
		Prism.highlightAll()
	}, [])

	return <div>{parse(data)}</div>
}

export default ParseHtml
