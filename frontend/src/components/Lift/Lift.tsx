import React from "react";
import { LiftModel, Instruction, Direction } from "../../models/models";
import OuterConsole from "../OuterConsole/OuterConsole";
import { InnerConsole } from "../InnerConsole/InnerConsole";

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
        if (await this.checkIfLiftIsAlreadyMoving() === false) {
            console.log(this.state)
            this.checkWhichDirection()
        };
    }

    private checkIfLiftIsAlreadyMoving = (): boolean => {
        if (!this.state.currentlyMoving) {
            this.setState((state) => ({
                currentDirection: state.instructions[0].direction,
                currentlyMoving: true
            }));
            return false;
        }
        return true;
    }

    private checkWhichDirection = () => {
        if (this.state.currentDirection === "up") {
            if (this.state.currentFloor > this.state.instructions[0].floorPressed) {
                this.setState({
                    currentDirection: "down"
                })
                this.moveLiftDown();
            } else {
                this.moveLiftUp();
            }
        } else {
            if (this.state.currentFloor < this.state.instructions[0].floorPressed) {
                this.setState({
                    currentDirection: "up"
                })
                this.moveLiftUp();
            } else {
                this.moveLiftDown();
            }
        }
    }

    private moveLiftUp = async () => {
        if (this.canTheLiftStopMoving() === true) {
            return
        }
        for (let floor = this.state.currentFloor; floor <= this.state.topFloor; floor++) {
            console.log(`floor : ${floor}`)
            await this.setState({ currentFloor: floor });
            await this.openDoors();
            if (this.state.doorsOpen === true) {
                // call a function that displays innerConsole and wait for it to return with the instructions
                console.log("going up: doors have opened");
                this.setState({
                    doorsOpen: false
                })
            } else {
                console.log("doors didn't open")
            }
            if (this.canTheLiftStopMoving() === true) {
                return
            }
            await new Promise(res => setTimeout(res, 3000));
        }
        if (this.canTheLiftStopMoving() === false) {
            this.changeDirections(this.state.currentDirection);
        }
    }

    private moveLiftDown = async () => {
        if (this.canTheLiftStopMoving() === true) {
            return;
        }
        for (let floor = this.state.currentFloor; floor >= 1; floor--) {
            console.log(`floor: ${floor}`);
            await this.setState({ currentFloor: floor});
            await this.openDoors();
            if (this.state.doorsOpen === true) {
                // call a function that displays the inner console and wait for it to return with the instructions
                console.log("going down, doors have opened");
                this.setState({
                    doorsOpen: false
                })
            }
            if (this.canTheLiftStopMoving() === true) {
                return;
            }
            await new Promise(res => setTimeout(res, 3000));
        }
        if (this.canTheLiftStopMoving() === false) {
            this.changeDirections(this.state.currentDirection);
        }
    }

    private changeDirections = (currentDirection: Direction): void => {
        if (currentDirection === "up") {
            this.setState({
                currentDirection: "down"
            })
            console.log("lift now moving down")
            this.moveLiftDown();
        } else if (currentDirection === "down") {
            this.setState({
                currentDirection: "up"
            })
            console.log("lift now moving up")
            this.moveLiftUp();
        }
    }

    private canTheLiftStopMoving = (): boolean => {
        if (this.state.instructions.length === 0) {
            this.setState({
                currentlyMoving: false
            })
            console.log("lift stopped moving")
            return true;
        }
        return false;
    }

    private openDoors = (): boolean => {
        console.log(`instructions: `)
        console.log(this.state.instructions)
        this.state.instructions.forEach(instruction => {
            if (instruction.floorPressed === this.state.currentFloor && instruction.direction === this.state.currentDirection) {
                this.setState({
                    doorsOpen: true
                })
                this.isThisTheTopOrBottomFloorInTheInstructions(this.state.currentDirection);
                this.deleteInstruction(instruction);
                return true;
            }
        })
        this.isThisTheTopOrBottomFloorInTheInstructions(this.state.currentDirection);
        return false;
    }

    private isThisTheTopOrBottomFloorInTheInstructions = (currentDirection: Direction): void => {
        if (currentDirection === "up") {
            // check to see if this is the top floor it needs to travel to
            const topFloorToTravelTo = Math.max.apply(Math, this.state.instructions.map(instruction => instruction.floorPressed));
            if (this.state.currentFloor === topFloorToTravelTo) {
                this.changeDirections(currentDirection);
            }
        } else {
            const minFloorToTravelTo = Math.min.apply(Math, this.state.instructions.map(instruction => instruction.floorPressed));
            if (this.state.currentFloor === minFloorToTravelTo) {
                this.changeDirections(currentDirection);
            }
        }
    }

    private deleteInstruction = (instruction: Instruction) => {
        let deleteTheInstruction = this.state.instructions.filter(eachInstruction => eachInstruction !== instruction);
        this.setState({ instructions: deleteTheInstruction });
    }

    public renderDoorOpen() {
        if (this.state.doorsOpen === true){
            return (
                <h2>The Lift Doors Open</h2>
            )
        }
    }

    public render() {
        const { currentFloor } = this.state;
        return (
        <div>
            <h1>The lift is currently on floor {currentFloor}</h1>

            {this.renderDoorOpen()}

            <OuterConsole callLift={this.addInstruction} />

            {/* <InnerConsole goToFloorInstructions={this.addInstruction} currentFloor={this.state.currentFloor} /> */}
        </div>
        )
    }
}

export default Lift;