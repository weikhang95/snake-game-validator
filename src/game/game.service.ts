// game.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { State, ValidateResponse, ValidateRequest } from './dto/game.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GameService {
  startNewGame(width: number, height: number): State | ValidateResponse {
    if (isNaN(width) || isNaN(height) || width < 1 || height < 1) {
      return { message: 'Invalid width or height', gameState: null };
    }
    const gameId = uuid();
    // Implement logic to start a new game with provided width and height
    const gameState: State = {
      gameId: gameId,
      width,
      height,
      score: 0,
      fruit: this.generateFruitPosition(width, height), // Generate initial fruit position
      snake: { x: 0, y: 0, velX: 1, velY: 0 }, // Initialize snake position and velocity
    };

    return gameState;
  }

  validateTicks(
    state: State,
    ticks: { velX: number; velY: number }[],
  ): ValidateResponse {
    const { snake, fruit, width, height } = state;

    for (const tick of ticks) {
      const { velX, velY } = tick;

      // Check for invalid velocity values
      if (![0, 1, -1].includes(velX) || ![0, 1, -1].includes(velY)) {
        throw new HttpException(
          'Invalid velocity values',
          HttpStatus.I_AM_A_TEAPOT,
        ); // 400: Invalid request
      }

      // Check for immediate 180-degree turn (invalid move)
      if (
        (snake.velX === velX * -1 && velX !== 0) ||
        (snake.velY === velY * -1 && velY !== 0)
      ) {
        throw new HttpException('Invalid move', HttpStatus.I_AM_A_TEAPOT); // 418: I'm a teapot
      }

      // Check if the snake hits the game bounds
      if (snake.x < 0 || snake.y < 0 || snake.x >= width || snake.y >= height) {
        throw new HttpException('Game Over', HttpStatus.I_AM_A_TEAPOT);
      }
      // Update snake's position based on the velocity
      snake.x += velX;
      snake.y += velY;

      // Check if the snake has reached the fruit when last tick is reached
      if (tick === ticks[ticks.length - 1]) {
        if (snake.x === fruit.x && snake.y === fruit.y) {
          // Increment score and generate new fruit position
          state.score++;
          state.fruit = this.generateFruitPosition(width, height);
        } else {
          throw new HttpException('Fruit not found', HttpStatus.NOT_FOUND); // 404: Not Found
        }
      }
    }

    return { message: 'Valid state & ticks', gameState: state };
  }

  private generateFruitPosition(width: number, height: number) {
    // Generate random position for the fruit within the game bounds
    const fruitX = Math.floor(Math.random() * width);
    const fruitY = Math.floor(Math.random() * height);
    return { x: fruitX, y: fruitY };
  }
}
