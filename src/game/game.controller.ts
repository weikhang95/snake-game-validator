// game.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  HttpException,
  UseFilters,
} from '@nestjs/common';
import { GameService } from './game.service';
import { State, ValidateRequest, ValidateResponse } from './dto/game.dto';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller()
@UseFilters(new HttpExceptionFilter())
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
      if (error instanceof HttpException) {
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

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  async validateTicks(
    @Body() body: ValidateRequest,
  ): Promise<ValidateResponse | any> {
    try {
      if (!body || !body.state || !body.ticks || !Array.isArray(body.ticks)) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }

      const validationResponse = await this.gameService.validateTicks(
        body.state,
        body.ticks,
      );
      return validationResponse;
    } catch (error) {
      if (error instanceof HttpException) {
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
