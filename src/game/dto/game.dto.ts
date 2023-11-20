// game.dto.ts

export interface State {
  gameId: string;
  width: number;
  height: number;
  score: number;
  fruit: Fruit;
  snake: Snake;
}

export interface Fruit {
  x: number;
  y: number;
}

export interface Snake {
  x: number;
  y: number;
  velX: number; // X velocity of the snake (one of -1, 0, 1)
  velY: number; // Y velocity of the snake (one of -1, 0, 1)
}

export interface ValidateRequest {
  state: State;
  ticks: { velX: number; velY: number }[];
}

export interface ValidateResponse {
  message: string;
  gameState?: State;
}
