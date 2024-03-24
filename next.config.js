/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
				pathname: '/**',
				port: '',
			},
		],
	},
	experimental: {
		mdxRs: true,
		serverComponentsExternalPackages: ['mongoose'],
	},
}

module.exports = nextConfig
