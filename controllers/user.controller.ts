import { BadRequestError, Body, Delete, Get, JsonController, NotFoundError, Param, Post } from "routing-controllers";
import { Service } from "typedi";
import { UserRepository } from "../repositories/user.repository";
import { UserCreateDto } from "../models/dtos/user-create-dto";

@JsonController('/user')
@Service()
export class UserController {
    constructor(public userRepository: UserRepository) {}

    @Post('/create')
    public async createUser(@Body() user: UserCreateDto) {
        return await this.userRepository.createUser(user);
    }

    @Delete("/:id")
    public async deleteUser(@Param("id") id: number) {
        if(id !== 0 || id !== undefined) {
            return await this.userRepository.deleteUser(id);
        } else {
            return new BadRequestError("You have not passed the intended user ID to be deleted");
        }
    }

    @Get("/:id")
    public async getUserById(@Param("id") id: number) {
        if(id !== 0 || id !== undefined) {
            const userFound = await this.userRepository.getUserById(id);

            if(userFound) {
                return userFound;
            } else {
                return new NotFoundError(`User for the ID of ${id} in the database`);
            }
        } else {
            return new BadRequestError("You have not passed the intended user ID to be searched");
        }
    }
}