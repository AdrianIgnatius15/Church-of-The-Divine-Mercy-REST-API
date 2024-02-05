import { Repository } from "sequelize-typescript";
import DatabaseMiddleware from "../middlewares/database.middleware";
import { User } from "../models/entities/user";
import { Service } from "typedi";
import { UserCreateDto } from "../models/dtos/user-create-dto";

@Service()
export class UserRepository  {
    private userRepository: Repository<User>
    constructor(databaseMiddleware : DatabaseMiddleware) {
        this.userRepository = databaseMiddleware.getDatabaseInstance().getRepository(User)
    }

    public async createUser(user: UserCreateDto) {
        try {
            const userCreated = await this.userRepository.create({...user}, { raw: true });
        
            return userCreated;
        } catch(error) {
            let errorDetails = error as Error;
            console.error("Error occured due to", errorDetails.message);

            return null;
        }
    }

    public async deleteUser(id: number) {
        try {
            return await this.userRepository.destroy({
                where: { id: id }
            }) > 0;
        } catch (error) {
            let errorDetails = error as Error;
            console.error("Error occured when deleting the user due to", errorDetails?.message);

            return false;
        }
    }

    public async getAllUsers() {
        try {
            return await this.userRepository.findAll();
        } catch (error) {
            let errorDetails = error as Error;
            console.error("Error occured when getting all users due to", errorDetails?.message);

            return [];
        }
    }

    public async getUserById(id: number) {
        try {
            return await this.userRepository.findByPk(id);
        } catch (error) {
            let errorDetails = error as Error;
            console.error("Error occured when getting user by ID due to", errorDetails?.message);

            return null;
        }
    }
}