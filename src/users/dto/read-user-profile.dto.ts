import { PickType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class ReadUserProfileDto extends PickType(User, ['displayName', 'profileImage'] as const) {}