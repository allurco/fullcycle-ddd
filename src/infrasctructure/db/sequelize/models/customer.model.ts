import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "customers",
    timestamps: false,
})
export default class CustomerModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column({
        allowNull: false,
    })
    declare name: string;

    @Column({
        allowNull: true,
    })
    declare street: string;
    
    @Column({
        allowNull: true,
    })
    declare city: string;
    
    @Column({
        allowNull: true,
    })
    declare state: string;

    @Column({
        allowNull: true,
    })
    declare zip: string;

    @Column({
        allowNull: false,
        defaultValue: false,
    })
    declare activated: boolean;

    @Column({
        allowNull: false,
        defaultValue: 0,
    })
    declare rewardPoints: number;

}