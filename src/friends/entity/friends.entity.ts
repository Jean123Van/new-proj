import { UserEntity } from "src/auth/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('friends')
export class FriendsEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    friend_user_id: string;
}