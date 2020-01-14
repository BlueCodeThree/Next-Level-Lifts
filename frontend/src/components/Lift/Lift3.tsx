import React from "react";
import { LiftModel, Instruction } from "../../models/models";
import OuterConsole from "../OuterConsole/OuterConsole";

export class Lift3 extends React.Component<{}, LiftModel> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentlyMoving: false,
            doorsOpen: false,
            currentDirection: "up",
            currentFloor: 1,
            topFloor: 10,
            instructions: []
        }
    }

    private addInstructions = (instruction: Instruction): void => {
        this.setState({
            instructions: [...this.state.instructions, instruction]
        }, () => {
            console.log(this.state.instructions);
            if (!this.state.currentlyMoving) {
                this.setState({
                    currentlyMoving: true
                }, () => {
                    this.moveLift();
                })
            }
        })
    }

    private moveLift = (): void => {
        while (this.state.currentlyMoving) {

            // Lift moving up
            if (this.state.currentDirection === "up") {
                for (let floor = this.state.currentFloor; floor <= this.state.topFloor; floor++) {
                    this.changeFloor(floor);
                    this.sleep();
                }
            }
            this.stopTheLift(this.state.instructions);
        }
    }

    private sleep = async(): Promise<void> => {
        await new Promise(res => setTimeout(res, 3000));
    }

    private stopTheLift = (instructions: Instruction[]): void => {
        if (instructions.length === 0) {
            this.setState({
                currentlyMoving: false
            }, () => {
                console.log("lift stopped moving")
            })
        }
    }

    private changeFloor = async (floor: number): Promise<void> => {
        console.log(`floor: ${floor}`);
        this.setState({
            currentFloor: floor
        }, async () => {
            console.log("sleeping")
            await new Promise(res => setTimeout(res, 3000)).then(() => {
                this.openDoorsCheck();
            })
        })
    }

    private openDoorsCheck = (): void => {
        this.state.instructions.forEach(instruction => {
            if (instruction.floorPressed === this.state.currentFloor && instruction.direction === this.state.currentDirection) {
                console.log("open the doors");
                this.deleteInstruction(instruction);
                console.log("close the doors");
            }
        })
    }

    private deleteInstruction = (instruction: Instruction) => {
        let deleteTheInstruction = this.state.instructions.filter(eachInstruction => eachInstruction !== instruction);
        this.setState({
            instructions: deleteTheInstruction
        })
    }

    public render() {
        const { currentFloor, doorsOpen } = this.state;
        return(
            <div>
                <h1>The lift is currently on floor {currentFloor}</h1>

                <OuterConsole callLift={this.addInstructions} />
            </div>
        )
    }
}