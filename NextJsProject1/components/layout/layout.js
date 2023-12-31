import { useContext } from "react";
import Notification from "../ui/notification";
import MainHeader from "./mainHeader";
import { NotificationContext } from "@/store/notification-context";

export default function Layout({ children }) {
	const notificationCtx = useContext(NotificationContext);

	const activeNotification = notificationCtx.notification;

	return (
		<>
			<MainHeader />
			<main>{children}</main>
			{activeNotification && (
				<Notification
					title={activeNotification.title}
					message={activeNotification.message}
					status={activeNotification.status}
				/>
			)}
		</>
	);
}
