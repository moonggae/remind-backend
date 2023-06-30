import { PickType } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";

export class SignInDto extends PickType(User, ['uid', 'loginType'] as const) {}