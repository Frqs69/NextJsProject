import "@/styles/globals.css";
import Layout from "@/components/home-Page/layout/layout";

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
