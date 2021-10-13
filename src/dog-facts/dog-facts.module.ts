import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DogFactsController } from './dog-facts.controller';
import { DogFactsService } from './dog-facts.service';

@Module({
  imports: [HttpModule],
  controllers: [DogFactsController],
  providers: [DogFactsService]
})
export class DogFactsModule {}
