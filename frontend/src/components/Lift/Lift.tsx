import React from "react";
import { LiftModel, Instruction } from "../../models/models";
import OuterConsole from "../OuterConsole/OuterConsole";

export class Lift extends React.Component<{}, LiftModel> {
    constructor(props: any) {
        super(props);
        this.state = {
            goingUp: true,
            currentFloor: 1,
            instructions: []
        }
    }

    private addInstruction = (instruction: Instruction) => {
        this.setState({
            instructions: [...this.state.instructions, instruction]
        })
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