import React from "react";
import { LiftModel, Instruction } from "../../models/models";
import OuterConsole from "../OuterConsole/OuterConsole";

export class Lift extends React.Component<{}, LiftModel> {
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

    private addInstruction = async(instruction: Instruction) => {
        this.setState({
            instructions: [...this.state.instructions, instruction]
        })
        console.log("before lift is moving")
        console.log(this.state);
        await this.checkIfLiftIsMoving();
        console.log("after lift is moving")
        console.log(this.state);

        this.checkWhichDirection()
    }

    private checkIfLiftIsMoving = () => {
        if (!this.state.currentlyMoving) {
            this.setState((state) => ({
                currentDirection: state.instructions[0].direction,
                currentlyMoving: true
            }));
        }
    }

    private checkWhichDirection = () => {
        if (this.state.currentDirection === "up") {
            console.log("moving up")
            this.moveLiftUp();
        } else {
            // this.moveLiftDown();
        }
    }

    private moveLiftUp = async () => {
        for (let floor = this.state.currentFloor; floor <= this.state.topFloor; floor++) {
            console.log(`floor : ${floor}`)
            this.setState({ currentFloor: floor });
            if (this.openDoors()) {
                // call a function that displays innerConsole and wait for it to return with the instructions
                console.log("doors have opened");
            }

            await new Promise(res => setTimeout(res, 5000));
        }
    }

    private openDoors = (): boolean => {
        this.state.instructions.forEach(instruction => {
            console.log("intstructions")
            console.log(instruction)
            if (instruction.floorPressed === this.state.currentFloor && instruction.direction === this.state.currentDirection) {
                this.setState({
                    doorsOpen: true
                })
                console.log("it got to open the doors")
                // delete the particular instruction
                return true;
            }
        })
        return false;
    }

    public render() {
        const { currentFloor } = this.state;

        return (
            <div>
                <p>The lift is currently on floor {currentFloor}</p>

                <OuterConsole callLift={this.addInstruction} />
            </div>
        )
    }
}

export default Lift;