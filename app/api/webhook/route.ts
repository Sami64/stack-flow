/* eslint-disable camelcase */
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

export async function POST(req: Request) {
	// You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

	if (!WEBHOOK_SECRET) {
		throw new Error(
			'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
		)
	}

	// Get the headers
	const headerPayload = headers()
	const svix_id = headerPayload.get('svix-id')
	const svix_timestamp = headerPayload.get('svix-timestamp')
	const svix_signature = headerPayload.get('svix-signature')

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Error occured -- no svix headers', {
			status: 400,
		})
	}

	// Get the body
	const payload = await req.json()
	const body = JSON.stringify(payload)

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET)

	let evt: WebhookEvent

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		}) as WebhookEvent
	} catch (err) {
		console.error('Error verifying webhook:', err)
		return new Response('Error occured', {
			status: 400,
		})
	}

	// Get the ID and type
	const eventType = evt.type

	if (eventType === 'user.created') {
		const { id, image_url, first_name, last_name, email_addresses, username } =
			evt.data

		// Create a new user
		const mongoUser = await createUser({
			clerkId: id,
			email: email_addresses[0].email_address,
			username: username ?? '',
			name: `${first_name} ${last_name ?? ''}`,
			picture: image_url,
		})

		console.log('mongo user', mongoUser)

		return NextResponse.json({ message: 'OK', user: mongoUser })
	} else if (eventType === 'user.updated') {
		// Handle user updated
		await updateUser({
			clerkId: evt.data.id,
			updateData: {
				email: evt.data.email_addresses[0].email_address,
				username: evt.data.username ?? '',
				name: `${evt.data.first_name} ${evt.data.last_name ?? ''}`,
				picture: evt.data.image_url,
			},
			path: `/profile/${evt.data.id}`,
		})

		return NextResponse.json({ status: 200 })
	} else if (eventType === 'user.deleted') {
		const { id } = evt.data
		// Handle user deleted
		await deleteUser({ clerkId: id! })

		return NextResponse.json({ status: 200 })
	}

	return new Response('', { status: 200 })
}
