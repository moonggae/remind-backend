import { NotificationContentType } from "./notification-content-type.type";
import { INotificationContent } from "./notification-content.interface";

export class NotificationContent implements INotificationContent {
    _text?: string;
    type?: NotificationContentType;
    targetId?: string;
    _title?: string;
    displayName?: string;

    constructor(data: INotificationContent) {
        this.type = data.type
        this.targetId = data.targetId
        this._text = data.text
        this._title = data.title
        this.displayName = data.displayName
    }

    set text(value: string) {
        this._text = value
    }

    get text(): string | undefined {
        if(this._text) return this._text

        switch(this.type) {
            case "MIND.POST" : return `${this.displayName ? `${this.displayName}님이` : "친구가" } 새로운 감정을 등록했어요.`
            case "MEMO.POST" : return `${this.displayName ? `${this.displayName}님이` : "친구가" } 새로운 메모를 작성했어요.`
            case "MEMO.UPDATE" : return `${this.displayName ? `${this.displayName}님이` : "친구가" } 메모를 업데이트 했어요.`
            case "MEMO.COMMENT" : return `${this.displayName ? `${this.displayName}님이` : "친구가" } 새로운 메모 코멘트를 남겼어요.`
            case "FRIEND.REQUEST" : return this.displayName ? `${this.displayName}님이 친구 요청을 보냈어요.` : "새로운 친구 요청이 있어요."
            case "FRIEND.ACCEPT": return this.displayName ? `${this.displayName}님이 친구 요청을 수락했어요.` : "친구 요청을 수락했어요."
            case "MIND.REQUEST": return `${this.displayName ? `${this.displayName}님이` : "친구가" } 현재 감정을 물어봤어요.`
        }
    }

    set title(value: string) {
        this._title = value
    }

    get title(): string | undefined {
        if(this._title) return this._title

        switch(this.type) {
            case "MIND.POST" : return "감정 기록"
            case "MEMO.POST" : return "메모 기록"
            case "MEMO.UPDATE" : return "메모 수정"
            case "MEMO.COMMENT" : return "메모 코멘트"
            case "FRIEND.REQUEST" : return "친구 요청"
            case "FRIEND.ACCEPT": return "친구 요청 수락"
            case "MIND.REQUEST": return "감정 묻기"
        }
    }
}