import { HttpService } from '@nestjs/axios';
import { HttpServer, Injectable } from '@nestjs/common';

@Injectable()
export class DogFactsService {
    constructor(private readonly httpservice: HttpService){}

    async findAll(){
        return (await this.httpservice.get('https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1').toPromise()).data
      
    }

}
