import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/repository/user.repository';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { FriendsRepository } from './repository/friends.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FriendsRepository]),
            TypeOrmModule.forFeature([UserRepository])],
  controllers: [FriendsController],
  providers: [FriendsService]
})
export class FriendsModule {}
