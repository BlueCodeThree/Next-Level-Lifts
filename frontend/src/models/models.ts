export interface LiftModel {
    goingUp: boolean,
    currentFloor: number,
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