import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommentDto } from "../dto/comment.dto";

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column()
    comment:string;
    @Column()
    user_id:string;
    @Column()
    post_id: string;
    @CreateDateColumn()
    created_at: Date;

}