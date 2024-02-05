import { UserCreateDto } from "./user-create-dto";

export class NewsCreateDto {
    declare headline : string;
    declare content : string;
    declare author : UserCreateDto;
}