import { PartialType } from "@nestjs/swagger";
import { CreateCardDto } from "src/mind/card/dto/create-card.dto";
import { CreateMindPostDto } from "./create-post.dto";

export class UpdateMindPostDto extends PartialType(CreateMindPostDto) {}