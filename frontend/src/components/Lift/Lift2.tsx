import React from "react";
import { LiftModel, Instruction, Direction } from "../../models/models";
import { InnerConsole } from "../InnerConsole/InnerConsole";
import OuterConsole from "../OuterConsole/OuterConsole";

export class Lift2 extends React.Component<{}, LiftModel> {
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

    private addInstruction = (instruction: Instruction): void => {
        this.setState({
            instructions: [...this.state.instructions, instruction]
        }, () => {
            // if the lift isn't already moving, start it going
            if (!this.state.currentlyMoving) {
                this.setState({
                    currentlyMoving: true
                }, () => {
                    this.liftMoving();
                })
            }
        })
    }

    private liftMoving = (): void => {
        while (this.state.currentlyMoving) {

            // Lift moving up
            if (this.state.currentDirection === "up") {
                for (let floor = this.state.currentFloor; floor <= this.state.topFloor; floor++) {
                    this.changeFloor(floor);
                    this.sleep();
                }
            }

            // Lift moving down
            else {
                for (let floor = this.state.currentFloor; floor >= 1; floor--) {
                    this.changeFloor(floor);
                    this.sleep();
                }
            }

            // check if the lift can stop or needs to change directions

        }
    }

    private areInstructionsEmpty = () => {
        if ( this.state.instructions.length === 0 ) {
            this.stopTheLift();
        }
    }

    private stopTheLift = ():void => {
        this.setState({
            currentlyMoving: false
        })
    }

    private changeFloor = (floor: number): void => {
        console.log(`floor : ${floor}`);
        this.setState({
            currentFloor: floor
        }, () => {
                this.openDoorsCheck();
        })
    }

    private openDoorsCheck = (): void => {
        this.state.instructions.forEach(instruction => {
            if (instruction.floorPressed === this.state.currentFloor && instruction.direction === this.state.currentDirection) {
                this.openDoors();
                this.deleteInstruction(instruction);
                this.closeDoors();
            }
        })
    }

    private deleteInstruction = (instruction: Instruction) => {
        let deleteTheInstruction = this.state.instructions.filter(eachInstruction => eachInstruction !== instruction);
        this.setState({
            instructions: deleteTheInstruction
        })
    }

    private openDoors = () => {
        // set state to open
        this.setState({
            doorsOpen: true
        }, () => {
            // display console and wait until the doors close.
            console.log("doors open")


            // check to see if the lift needs to go up/down further floors before deleting the instruction
            if ((this.state.currentDirection === "up" && this.state.currentFloor === this.topFloorToTravelToCheck()) || (this.state.currentDirection === "down" && this.state.currentFloor === this.bottomFloorToTravelToCheck())) {
                // The lift is at it's top/bottom floor it needs to travel to
                this.changeDirections(this.state.currentDirection);
                this.canTheLiftStopMoving(this.state.instructions);
            }
        })
    }

    private displayConsole = () => {
        while (this.state.doorsOpen) {
            // display the console until user closes the doors
            // The view should render the console. We need this to wait until the callback to close the doors and sets the state to close the doors.
        }
    }

    private changeDirections = (currentDirection: Direction): void => {
        if (currentDirection === "up") {
            this.setState({
                currentDirection: "down"
            }, () => {
                console.log("now moving down");
            })
        } else {
            this.setState({
                currentDirection: "up"
            })
        }
    }

    private canTheLiftStopMoving = (instructions: Instruction[]): void => {
        if (instructions.length === 0) {
            this.setState({
                currentlyMoving:  false
            }, () => {
                console.log("lift stopped moving")
            })
        }
    }


    private closeDoors = () => {
        this.sleep().then(() => {
            this.setState({
                doorsOpen: false
            }, () => {
                console.log("doors closed")
            })
        })
    }



    private topFloorToTravelToCheck = (): number => {
        return Math.max.apply(Math, this.state.instructions.map(instruction => instruction.floorPressed));
    }

    private bottomFloorToTravelToCheck = (): number => {
        return Math.min.apply(Math, this.state.instructions.map(instruction => instruction.floorPressed));
    }

    private sleep = async(): Promise<void> => {
        await new Promise(res => setTimeout(res, 3000));
    }

    public render() {
        const { currentFloor, doorsOpen } = this.state;
        return (
            <div>
                <h1>The lift is currently on floor {currentFloor}</h1>

                <OuterConsole callLift={this.addInstruction} />

                {doorsOpen &&
                    <InnerConsole goToFloorInstructions={this.addInstruction} currentFloor={this.state.currentFloor} />
                }
            </div>
        )
    }
}