// Utility to share Black Hole screen position with the interactive cursor for gravitational lensing
export interface BlackHoleState {
  x: number;
  y: number;
  radius: number;
  active: boolean;
  intensity: number;
}

let currentBlackHole: BlackHoleState = {
  x: 0,
  y: 0,
  radius: 260,
  active: false,
  intensity: 1,
};

export const updateBlackHolePosition = (state: Partial<BlackHoleState>) => {
  currentBlackHole = { ...currentBlackHole, ...state };
};

export const getBlackHolePosition = (): BlackHoleState => {
  return currentBlackHole;
};
