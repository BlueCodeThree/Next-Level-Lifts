import React from "react";
import { LiftModel } from "../../models/models";

export class Lift extends React.Component<{}, LiftModel> {
    constructor(props: any) {
        super(props);
        this.state = {
            goingUp: true,
            currentFloor: 1
        }
    }

    public render() {
        const { currentFloor } = this.state;

        return (
            <div>
                <p>The lift is currently on floor {currentFloor}</p>
            </div>
        )
    }
}

export default Lift;