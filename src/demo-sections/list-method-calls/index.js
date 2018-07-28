import * as React from "react";
import {Panel} from "react-bootstrap";

export class SingleCall extends React.Component {
    render() {
        return (
            <li>
               {this.props.result}
            </li>
        )
    }
}

export class CallContainer extends React.Component {
    render() {
        return (
            <Panel bsStyle="primary">
                <Panel.Heading>Method Call List</Panel.Heading>
                <Panel.Body>
                    <div>
                        <ul>
                        {this.props.children}
                        </ul>
                    </div>
                </Panel.Body>
            </Panel>
        )
    }
}

