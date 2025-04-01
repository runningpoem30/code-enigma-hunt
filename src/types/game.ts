
export interface Level {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  hint: string;
  clue: string;
}

export interface GameState {
  currentLevel: number;
  completedLevels: number[];
  collectedClues: { [key: number]: string };
  totalLevels: number;
}

export const INITIAL_GAME_STATE: GameState = {
  currentLevel: 0, // 0 means no level selected yet
  completedLevels: [],
  collectedClues: {},
  totalLevels: 10,
};
