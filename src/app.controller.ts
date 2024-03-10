import { Controller, Get, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Observable, interval, map } from 'rxjs';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  async index(@Res() res: Response) {
    try {
      res.status(200).type("text/html").send(readFileSync(join(__dirname, 'index.html')).toString());
    } catch (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
    }
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { eventName: 'Test', eventContent: 'Hello World', eventCreated: new Date().toString(), eventType: "text" } } as MessageEvent)),
    );
  }
}
