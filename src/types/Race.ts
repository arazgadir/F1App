export interface iRace {
    raceName: string;
    date: string;
    round: string;
    season: string;
    Circuit: {
      circuitName: string;
      circuitId: string;
    };
    Results: {
      position: string;
    }[];
  }