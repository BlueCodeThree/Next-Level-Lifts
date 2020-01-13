import React from "react";
import { OuterConsoleProps, Direction } from "../../models/models";

export class OuterConsole extends React.Component<OuterConsoleProps, {}> {
    private callLift = (e: React.FormEvent<HTMLButtonElement>) => {
        const liftFloor = parseInt((document.getElementById("callingLiftFloor")as HTMLInputElement).value)
        this.props.callLift({direction: (e.target as HTMLButtonElement).id as Direction, floorPressed: liftFloor })
    }

    public render() {
        return (
            <div>
                <h2>Call The Lift</h2>
                <div>
                    <label
                        htmlFor="callingLiftFloor"
                    >
                        Floor Calling Lift From:
                    </label>
                    <select
                        id="callingLiftFloor"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div>
                    <button
                        id="up"
                        onClick={(e) => this.callLift(e)}
                    >
                        Up
                    </button>
                </div>

                <div>
                    <button
                        id="down"
                        onClick={(e) => this.callLift(e)}
                    >
                        Down
                    </button>
                </div>
            </div>
        )
    }
}

export default OuterConsole;