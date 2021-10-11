import { EntityRepository, Repository } from "typeorm";
import { FriendsEntity } from "../entity/friends.entity";

@EntityRepository(FriendsEntity)
export class FriendsRepository extends Repository<FriendsEntity>{

}