import { SessionMessageAttachment } from "./SessionMessageAttachment";

export class SessionMessage {
    id: number;
    sessionId: number;
    mine: boolean;
    createDate: Date;
    text: string;
    senderName: string;
    sessionMessageTypeId: number;
    sessionMessageAttachment: SessionMessageAttachment;
}