import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('friends')
export class FriendsEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    friend_user_id: string;
}