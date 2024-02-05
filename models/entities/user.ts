import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    timestamps: true,
    deletedAt: "userDeletedAt",
    paranoid: true,
    createdAt: true,
    updatedAt: true
})
export class User extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number

    @Column({
        type: DataType.STRING
    })
    declare firstName : string;

    @Column({
        type: DataType.STRING
    })
    declare lastName: string;

    @Column({
        type: DataType.STRING
    })
    declare email: string;

    @Column({
        type: DataType.STRING
    })
    declare phone: string;
}