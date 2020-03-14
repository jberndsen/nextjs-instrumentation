import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Post('event')
  event(@Body() eventData) {
    console.dir(eventData, {depth: null});
    return 'Ok';
  }
}
