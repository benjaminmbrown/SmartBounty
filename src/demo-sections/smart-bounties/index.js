import * as React from "react";
import {Vortex, callContract, getContract} from "vort_x";
import {VortexContractsList, connect, VortexMethodCallList} from 'vort_x-components';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';
import {Panel} from "react-bootstrap";
import {CallContainer, SingleCall} from "../list-method-calls";

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class ContractCallReturnContainer extends React.Component {

    constructor(props) {
        super(props);
        this.bountyName = this.bountyName.bind(this);
    
    }

    bountyName(event){
        event.preventDefault();
        console.log('this.bountyN',this.bountyN.value);
        this.props.update(this.bountyN.value);
    }

    render() {
        return (<div>
            <p>Bounties {this.props.result}</p>
            <form onSubmit={this.bountyName}>
                <FieldGroup
                    id="bountyN"
                    type="text"
                    label="Bounty Name"
                    placeholder="Enter Bounty Name"
                    inputRef={input => this.bountyN = input}
                />
                <Button type="submit">Create </Button>
            </form>
        </div>)
    }
}

class ContractsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.props.contract.instance.vortexMethods.get.data({from: this.props.web3.coinbase});
        Vortex.get().subscribeEvent(
            "CreateBounty", 
            this.props.contract_name, 
            this.props.contract_address);

        const mapStateToProps = (state) => {
            return {
                result: callContract(getContract(state, 
                    this.props.contract_name, 
                    this.props.contract_address),
                     "getBountyCount", 
                     {from: this.props.web3.coinbase}),
                update: (bountyName) => {
                    this.props.contract.instance.vortexMethods.createBounty.send(
                        bountyName, {from: this.props.web3.coinbase, gas: 1030000}
                    );
                }
            }
        };
        this.resultContainer = connect(ContractCallReturnContainer, mapStateToProps);
    }

    render() {
        if (this.props.contract) {
            return <Panel bsStyle="primary">
                <Panel.Heading>{this.props.contract_name} : {this.props.contract_address}</Panel.Heading>
                <Panel.Body>
                    {/* <VortexMethodCallList 
                    container={CallContainer} 
                    element={SingleCall} 
                    methodName="getBountiesByOwner" 
                    contractName={this.props.contract_name} 
                    contractAddress={this.props.contract_address} 
                    arguments={[
                        [this.props.web3.coinbase,{from:this.props.web3.coinbase}]
                        ]}/> */}
                    <this.resultContainer/>
                </Panel.Body>
            </Panel>;
        } else
            return <div/>;
    }
}

export class SmartBounties extends React.Component {

    render() {
        return <Panel>
            <Panel.Heading>Contracts</Panel.Heading>
            <Panel.Body>
                <VortexContractsList element={ContractsContainer} contract_name="SmartBounty"/>
            </Panel.Body>
        </Panel>

        
    }

}
