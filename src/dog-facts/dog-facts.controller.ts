import { Controller, Get } from '@nestjs/common';
import { DogFactsService } from './dog-facts.service';

@Controller('dog-facts')
export class DogFactsController {
    constructor(private readonly dogFactsService:DogFactsService){}

    @Get()
    getDogFacts(){
        return this.dogFactsService.findAll()
    }
}
