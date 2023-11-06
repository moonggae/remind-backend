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
        const friendSocket = await this.getFriendSocket(myId)
        console.log(`pushToFriend - friendSocket.connected: ${friendSocket?.connected}`)
        const success = friendSocket?.emit(event, data)
        console.log(`pushToFriend - success: ${success}`)
    }

    private async getFriendSocket(userId: string): Promise<Socket | undefined> {
        const friend = await this.friendService.findFriend(userId)
        console.log(`getFriendSocket - friend: ${friend}`)
        if(friend) {
            return this.clients.find(client => client.user.id == friend.id)?.socket
        }
    }
}