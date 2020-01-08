export interface LiftModel {
    currentlyMoving: boolean,
    doorsOpen: boolean,
    currentDirection: Direction,
    currentFloor: number,
    topFloor: number,
    instructions: Instruction[]
}

export type Direction = "up" | "down";

export interface Instruction {
    direction: Direction,
    floorPressed: number,
}

export interface OuterConsoleProps {
    callLift: (callLift: Instruction) => void
}