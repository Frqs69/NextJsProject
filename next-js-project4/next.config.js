const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

module.exports = (phase) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return nextConfig;
	}

	// if we are not in development phase, we can return different config for production
	return nextConfig;
};
