import { NotificationContentType } from "./notification-content-type.type";

export interface NotificationOptions {
    title?: string,
    text?: string,
    type?: NotificationContentType,
    targetId?: string
}