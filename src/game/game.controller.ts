// game.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  Param,
  HttpException,
} from '@nestjs/common';
import { GameService } from './game.service';
import { State, ValidateRequest, ValidateResponse } from './dto/game.dto';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('new')
  //query param w and h
  async startNewGame(
    @Query('w') w: number,
    @Query('h') h: number,
  ): Promise<State | any> {
    try {
      const gameState = await this.gameService.startNewGame(w, h);
      return gameState;
    } catch (error) {
      return { message: 'Invalid request' };
    }
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  async validateTicks(
    @Body() body: ValidateRequest,
  ): Promise<ValidateResponse | any> {
    try {
      const validationResponse = await this.gameService.validateTicks(
        body.state,
        body.ticks,
      );
      return validationResponse;
    } catch (error) {
      if (error instanceof HttpException) {
        console.log('error', error);
        // If it's an HTTP exception, return the status and message
        throw error;
      } else {
        // For other types of errors, return a 500 Internal Server Error
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
