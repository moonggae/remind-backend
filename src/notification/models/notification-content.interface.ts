import { NotificationContentType } from "./notification-content-type.type";

export interface INotificationContent {
    title?: string,
    text?: string,
    type?: NotificationContentType,
    targetId?: string,
    displayName?: string
}