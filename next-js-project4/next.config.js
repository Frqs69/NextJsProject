const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		mongoDb_user: "kbazyluk123",
		mongoDb_password: "74pKHpWFWtcJUlEm",
		mongoDb_clusterName: "cluster0",
		mongoDb_database: "my-site",
	},
};

module.exports = (phase) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return nextConfig;
	}

	// if we are not in development phase, we can return different config for production
	return nextConfig;
};
