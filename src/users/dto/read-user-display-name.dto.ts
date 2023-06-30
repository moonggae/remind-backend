import { PickType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class ReadUserDisplayNameDto extends PickType(User, ['displayName'] as const) {}