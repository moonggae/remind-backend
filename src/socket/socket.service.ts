import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { SOCKET_EVENT } from "src/common/enum/socket-event.enum";
import { FriendService } from "src/friend/friend.service";
import { User } from "src/users/entities/user.entity";

class SocketClient {
    user: User | undefined
    socket: Socket
}

@Injectable()
export class SocketService {
    public socket: Server = null;
    private clients: SocketClient[] = []

    constructor(
        @Inject(forwardRef(() => FriendService))
        private readonly friendService: FriendService,
    ) {}

    addClient(socketClient: SocketClient) {
        const existsClient = this.clients.find(client => client.user.id == socketClient.user.id)
        if(existsClient) {
            this.clients = this.clients.filter(client => client.user.id != existsClient.user.id)
        }
        this.clients.push(socketClient)
    }

    removeClient(socket: Socket) {
        this.clients = this.clients.filter(client => client.socket.id != socket.id)
    }

    async pushToFriend(myId: string, event: SOCKET_EVENT, data: any) {
        const friend = await this.friendService.findFriend(myId)
        if(friend?.id != null) {
            this.pushToUser(friend.id, event, data)
        }
    }

    async pushToUser(userId: string, event: SOCKET_EVENT, data: any) {
        const userSocket = await this.getUserSocket(userId)
        console.log(`pushToUser - userSocket.connected: ${userSocket?.connected}`)
        const success = userSocket?.emit(event, data)
        console.log(`pushToUser - success: ${success}`)
        console.log(`userId: ${userId}, evnet: ${event}, data: ${data}`)
    }

    private async getFriendSocket(userId: string): Promise<Socket | undefined> {
        const friend = await this.friendService.findFriend(userId)
        console.log(`getFriendSocket - friend: ${friend}`)
        if(friend?.id != null) {
            return this.getUserSocket(friend?.id)
        }
    }

    private async getUserSocket(userId: string): Promise<Socket | undefined> {
        return this.clients.find(client => client.user.id == userId)?.socket
    }
}