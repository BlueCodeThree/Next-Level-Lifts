import React from "react";
import { InnerConsoleProps, Direction } from "../../models/models";

export class InnerConsole extends React.Component<InnerConsoleProps, {}> {
    
    private goToFloorInstructions = (e: React.FormEvent<HTMLButtonElement>) => {
        let theDirection = this.workOutTheDirection(e);
        this.props.goToFloorInstructions({direction: theDirection, floorPressed: parseInt((e.target as HTMLButtonElement).id) })
    }

    private workOutTheDirection = (e: React.FormEvent<HTMLButtonElement>): Direction => {
        if (this.props.currentFloor > parseInt((e.target as HTMLButtonElement).id)) {
            return "down"
        } else {
            return "up"
        }
    }

    private closeTheDoors = () => {

    }

    public render() {
        return (
            <div>
                <h2>Inside the lift, select what floor you want to go to</h2>

                <form>
                    <div>
                        <button
                            id="1"
                            onClick={(e) => this.goToFloorInstructions(e)}
                        >
                            1
                        </button>
                        <button
                            id="2"
                            onClick={(e) => this.goToFloorInstructions(e)}
                        >
                            2
                        </button>
                        <button
                            id="3"
                            onClick={(e) => this.goToFloorInstructions(e)}
                        >
                            3
                        </button>
                    </div>
                    <div>
                        <button
                            id="4"
                            onClick={(e) => this.goToFloorInstructions(e)}
                        >
                            4
                        </button>
                        <button
                            id="5"
                            onClick={(e) => this.goToFloorInstructions(e)}
                        >
                            5
                        </button>
                        <button
                            id="6"
                            onClick={(e) => this.goToFloorInstructions(e)}
                        >
                            6
                        </button>
                    </div>
                    <div>
                        <button
                            id="7"
                            onClick={(e) => this.goToFloorInstructions(e)}
                        >
                            7
                        </button>
                        <button
                            id="8"
                            onClick={(e) => this.goToFloorInstructions(e)}
                        >
                            8
                        </button>
                        <button
                            id="9"
                            onClick={(e) => this.goToFloorInstructions(e)}
                        >
                            9
                        </button>
                    </div>
                    <div>
                        <button
                            id="10"
                        >
                            10
                        </button>
                    </div>
                    <div>
                        <button
                            id="closeDoors"
                        >
                            Close Doors
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}