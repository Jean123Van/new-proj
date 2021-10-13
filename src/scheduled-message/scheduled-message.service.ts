import { Injectable } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule'

@Injectable()
export class ScheduledMessageService {

    @Interval(20000)
    shortInMessage(){
        console.log('it is 20 seconds')
    }

    @Interval(18000000)
    longIntMessage(){
        console.log('it is 5 mins')
    }
    
}
