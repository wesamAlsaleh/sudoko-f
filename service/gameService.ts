import api from "@/lib/axios";

// declare api endpoints that are related to the game
export const gameService = {
  // Get a specific game by ID
  getGame: async (id: string) => {
    const response = await api.get(`/api/v1/sudoku/${id}`);
    return response.data;
  },

  // Create a new game
  createNewGame: async (difficulty: string) => {
    const response = await api.post("/api/v1/sudoku", {
      difficulty: difficulty,
    });
    return response.data;
  },

  // Submit a solution
  submitGame: async (uuid: string, playerSolution: string) => {
    const response = await api.post(`/api/v1/sudoku/submit`, {
      uuid: uuid,
      playerSolution: playerSolution,
    });
    return response.data;
  },
};
