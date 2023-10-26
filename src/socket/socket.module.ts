import { Global, Module, forwardRef } from "@nestjs/common";
import { SocketService } from "./socket.service";
import { FriendModule } from "src/friend/friend.module";

@Global()
@Module({
    imports: [
        forwardRef(() => FriendModule),
    ],
    providers: [SocketService],
    exports: [SocketService]
})
export class SocketModule { }