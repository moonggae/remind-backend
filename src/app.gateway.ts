import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Injectable } from "@nestjs/common";
import { SocketService } from "./socket/socket.service";
import { AuthService } from "./auth/auth.service";

@Injectable()
@WebSocketGateway(1234)
export class AppGateway implements OnGatewayInit, OnGatewayConnection ,OnGatewayDisconnect {
    constructor(
        private socketService: SocketService,
        private authService: AuthService
    ) {}

    afterInit(server: Server) {
        this.socketService.socket = server
    }

    async handleConnection(client: Socket) {
        const auth = client.handshake.auth["authorization"] as string // "Bearer"
        console.log(`handleConnection - auth: ${auth}`)
        const splitedAuthString = auth.split(' ')
        if(splitedAuthString[0] == "Bearer") {
            const token = splitedAuthString[1]
            const user = await this.authService.verifyAsync(token)
            if(user) {
                this.socketService.addClient({
                    user: user,
                    socket: client
                })
                console.log(`handleConnection: addClient`)
            } else {
                console.log('handleConnection: not found user')
                client.disconnect(true)
            }
        } else {
            console.log('handleConnection: not found token')
            client.disconnect(true)
        }
    }

    handleDisconnect(client: Socket) {
        this.socketService.removeClient(client)
    }

    @SubscribeMessage("open-connect")
    private async connet(
        @MessageBody() token: string,
        @ConnectedSocket() client: Socket
    ) {
        const user = await this.authService.verifyAsync(token)
        if(user) {
            this.socketService.addClient({
                user: user,
                socket: client
            })
        }
    }
}