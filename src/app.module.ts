import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  imports: [],
  controllers: [AppController, GameController],
  providers: [
    AppService,
    GameService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
