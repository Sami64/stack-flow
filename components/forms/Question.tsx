'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createQuestion } from '@/lib/actions/question.action'
import { QuestionsSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tinymce/tinymce-react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Badge } from '../ui/badge'

const type: any = 'create'

const Question = () => {
	const editorRef = useRef<Editor | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const form = useForm<z.infer<typeof QuestionsSchema>>({
		resolver: zodResolver(QuestionsSchema),
		defaultValues: {
			title: '',
			explanation: '',
			tags: [],
		},
	})

	const handleTagRemove = (tag: string, field: any) => {
		const tags = field.value.filter((t: string) => t !== tag)
		form.setValue('tags', tags)
	}

	const handleInputKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		field: any
	) => {
		if (e.key === 'Enter' && field.name === 'tags') {
			e.preventDefault()

			const tagInput = e.target as HTMLInputElement
			const tagValue = tagInput.value.trim()

			if (tagValue !== '') {
				if (tagValue.length > 15) {
					return form.setError('tags', {
						type: 'required',
						message: 'Tag must be less than 15 characters',
					})
				}

				if (!field.value.includes(tagValue as never)) {
					form.setValue('tags', [...field.value, tagValue])
					tagInput.value = ''
					form.clearErrors('tags')
				} else {
					form.trigger()
				}
			}
		}
	}

	async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
		setIsSubmitting(true)
		try {
			// make async call to api
			await createQuestion(values)
		} catch (error) {
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-10">
				{/** Question Title */}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel className="text-dark400_light800 paragraph-semibold">
								Question Title <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Input
									className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
									{...field}
								/>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Be descriptiive as possible
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				{/** Question Explanation */}
				<FormField
					control={form.control}
					name="explanation"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel className="text-dark400_light800 paragraph-semibold">
								Detailed explanation of your problem?
								<span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Editor
									apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
									onInit={(evt, editor) => {
										// @ts-ignore
										editorRef.current = editor
									}}
									initialValue=""
									onEditorChange={(content, editor) => {
										field.onChange(content)
									}}
									onBlur={(content, editor) => field.onBlur()}
									init={{
										height: 350,
										menubar: false,
										plugins: [
											'advlist',
											'autolink',
											'lists',
											'link',
											'image',
											'charmap',
											'preview',
											'anchor',
											'searchreplace',
											'visualblocks',
											'fullscreen',
											'insertdatetime',
											'media',
											'table',
											'codesample',
										],
										toolbar:
											'undo redo | blocks | ' +
											'codesample | bold italic forecolor | alignleft aligncenter ' +
											'alignright alignjustify | bullist numlist ',
										content_style: 'body { font-family:Inter; font-size:16px }',
									}}
								/>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Introduce the problem and expand on what you put in the title.
								Minimum 20 characters.
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				{/** Question Tags */}
				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel className="text-dark400_light800 paragraph-semibold">
								Tags <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<>
									<Input
										className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
										onKeyDown={(e) => handleInputKeyDown(e, field)}
									/>

									{field.value.length > 0 && (
										<div className="flex-start mt-2.5 gap-2.5">
											{field.value.map((tag: any) => (
												<Badge
													key={tag}
													onClick={() => handleTagRemove(tag, field)}
													className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize">
													{tag}{' '}
													<Image
														src="/assets/icons/close.svg"
														alt="close icon"
														width={12}
														height={12}
														className="cursor-pointer object-contain invert-0 dark:invert"
													/>
												</Badge>
											))}
										</div>
									)}
								</>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Add up to 5 tags to describe what your question is about. Start
								typing to see suggestions.
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					disabled={isSubmitting}
					className="primary-gradient w-fit !text-light-900">
					{isSubmitting ? (
						<>{type === 'edit' ? 'Editing' : 'Posting...'}</>
					) : (
						<>{type === 'edit' ? 'Edit Question' : 'Ask a Question'}</>
					)}
				</Button>
			</form>
		</Form>
	)
}

export default Question
