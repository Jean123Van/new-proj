import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { FriendsModule } from './friends/friends.module';
import { PostModule } from './post/post.module';
import { DogFactsModule } from './dog-facts/dog-facts.module';
import { ScheduledMessageModule } from './scheduled-message/scheduled-message.module';
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_Host'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ScheduleModule.forRoot(),
    AuthModule, UserModule, FriendsModule, PostModule, DogFactsModule, ScheduledMessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
