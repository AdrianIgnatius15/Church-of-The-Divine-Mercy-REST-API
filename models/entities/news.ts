import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    timestamps: true,
    deletedAt: "newsDeletedAt",
    paranoid: true
})
export class News extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare newsId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare headline : string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare content : string;
}