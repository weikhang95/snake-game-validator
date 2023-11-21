  ## Installation
```bash

$  npm  install

```

## Running the app


```bash

# development
$  npm  run  start

# watch mode
$  npm  run  start:dev

# production mode
$  npm  run  start:prod

```

  

## Game Controller Feature

  

This NestJS application includes a Game Controller that provides functionalities related to a gaming feature. It offers endpoints for starting new games, validating game ticks, and managing game states.

  

### Start New Game

  

The Game Controller exposes a `GET` endpoint to initiate a new game session. It accepts query parameters for specifying the width and height of the game grid. Upon successful initiation, it returns the initial state of the game.

 
Endpoint: `GET /new?w={width}&h={height}`

Example:

```bash
curl  -X  GET  http://localhost:3000/new?w=10&h=10
```

### Validate Game Ticks

The controller also offers a `POST` endpoint to validate movements or ticks within the game. It expects a JSON payload containing the current game state and an array of movement ticks. The service validates these ticks against the game's rules and returns the updated game state if the moves are valid.

**Endpoint:** `POST /validate`

**Request Body:**
```
{
  "state": {
    "gameId": "15212184-96f6-4b62-b293-e5f01bae5278",
    "width": "20",
    "height": "20",
    "score": 0,
    "fruit": {
		"x": 6,
		"y": 1
	},
	"snake": {
		"x": 0,
		"y": 0,
		"velX": 1,
		"velY": 0
	}
  },
  "ticks": [
	    { "velX": 1, "velY": 0 },
		{ "velX": 1, "velY": 0 },
		{ "velX": 1, "velY": 0 },
		{ "velX": 1, "velY": 0 },
		{ "velX": 1, "velY": 0 },
		{ "velX": 1, "velY": 0 },
		{ "velX": 0, "velY": 1 }  
	]
}

```

