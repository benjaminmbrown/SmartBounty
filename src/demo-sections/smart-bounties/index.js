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
        this.bountyAmount = this.bountyAmount.bind(this);
    
    }

    bountyAmount(event){
        event.preventDefault();
        this.props.update(this.bountyN.value);
    }

    render() {
        return (<div>
            <p>Create Bounty (customers only)</p>
            <h3>Bounties: <strong> {this.props.result}</strong></h3>
            <form onSubmit={this.bountyAmount}>
                <FieldGroup
                    id="bountyN"
                    type="number"
                    label="Bounty Amt"
                    placeholder="Enter Bounty Amt"
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
        this.props.contract.instance.vortexMethods.getBountyCount.data(
            {from: this.props.web3.coinbase}
        );
        
        Vortex.get().subscribeEvent(
            "BountyCreated", 
            this.props.contract_name, 
            this.props.contract_address
        );

        const mapStateToProps = (state) => {
            return {
                result: callContract(getContract(state, 
                    this.props.contract_name, 
                    this.props.contract_address),
                     "getBountyCount", 
                     {from: this.props.web3.coinbase}),
                update: () => {
                    this.props.contract.instance.vortexMethods.createBounty.send(
                        {from: this.props.web3.coinbase, gas: 1030000}
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


class BountyCallReturnContainer extends React.Component {

    constructor(props) {
        super(props);
        this.bountyId = this.bountyId.bind(this);
    
    }

    bountyId(event){
        event.preventDefault();
        this.props.update(this.bountyI.value);
    }

    render() {
        return (<div>
             <p> Initiated? {this.props.result}</p>
            <form onSubmit={this.bountyId}>
                <FieldGroup
                    id="bountyI"
                    type="number"
                    label="Bounty Id"
                    placeholder="Bounty ID"
                    inputRef={input => this.bountyI = input}
                />
                <Button type="submit">Take Bounty</Button>
            </form>
        </div>)
    }
}

class BountiesContainter extends React.Component {
    constructor(props) {
        super(props);
        this.props.contract.instance.vortexMethods.isBountyInitiated.data(
            1,
            {from: this.props.web3.coinbase}
        );
        Vortex.get().subscribeEvent(
            "BountyTaken", 
            this.props.contract_name, 
            this.props.contract_address);

        const mapStateToProps = (state) => {
            return {
                result: callContract(getContract(state, 
                    this.props.contract_name, 
                    this.props.contract_address),
                     "isBountyInitiated", 
                     1,
                     {from: this.props.web3.coinbase}),
                update: (bountyId) => {
                    this.props.contract.instance.vortexMethods.initiateBounty.send(
                         bountyId, {from: this.props.web3.coinbase, gas: 6654755}
                    );
                }
            }
        };
        this.resultContainer = connect(BountyCallReturnContainer, mapStateToProps);
    }

    render() {
        if (this.props.contract) {
            return <Panel bsStyle="primary">
                <Panel.Heading>Initiate Bounty (contractors only)</Panel.Heading>
                <Panel.Body>
                    <this.resultContainer/>
                </Panel.Body>
            </Panel>;
        } else
            return <div/>;
    }

}

class CompleteBountyCallReturnContainer extends React.Component {

    constructor(props) {
        super(props);
        this.bountyId = this.bountyId.bind(this);
    
    }

    bountyId(event){
        event.preventDefault();
        this.props.update(this.bountyI.value);
    }

    render() {
        return (<div>
             <p> Completed? {this.props.result}</p>
            <form onSubmit={this.bountyId}>
                <FieldGroup
                    id="bountyI"
                    type="number"
                    label="Bounty Id"
                    placeholder="Bounty ID"
                    inputRef={input => this.bountyI = input}
                />
                <Button type="submit">Complete Bounty</Button>
            </form>
        </div>)
    }
}

class CompleteBountiesContainter extends React.Component {
    constructor(props) {
        super(props);
        this.props.contract.instance.vortexMethods.isBountyCompleted.data(
            1,
            {from: this.props.web3.coinbase}
        );
        Vortex.get().subscribeEvent(
            "BountyCompleted", 
            this.props.contract_name, 
            this.props.contract_address);

        const mapStateToProps = (state) => {
            return {
                result: callContract(getContract(state, 
                    this.props.contract_name, 
                    this.props.contract_address),
                     "isBountyCompleted", 
                     1,
                     {from: this.props.web3.coinbase}),
                update: (bountyId) => {
                    this.props.contract.instance.vortexMethods.completeBounty.send(
                         bountyId, {from: this.props.web3.coinbase, gas: 6654755}
                    );
                }
            }
        };
        this.resultContainer = connect(CompleteBountyCallReturnContainer, mapStateToProps);
    }

    render() {
        if (this.props.contract) {
            return <Panel bsStyle="primary">
                <Panel.Heading>Complete Bounty (contractors only)</Panel.Heading>
                <Panel.Body>
                    <this.resultContainer/>
                </Panel.Body>
            </Panel>;
        } else
            return <div/>;
    }

}


class VerifyBountyCallReturnContainer extends React.Component {

    constructor(props) {
        super(props);
        this.bountyId = this.bountyId.bind(this);
    
    }

    bountyId(event){
        event.preventDefault();
        this.props.update(this.bountyI.value);
    }

    render() {
        return (<div>
             <p> Verified? {this.props.result}</p>
            <form onSubmit={this.bountyId}>
                <FieldGroup
                    id="bountyI"
                    type="number"
                    label="Bounty Id"
                    placeholder="Bounty ID"
                    inputRef={input => this.bountyI = input}
                />
                <Button type="submit">Verify Bounty</Button>
            </form>
        </div>)
    }
}

class VerifyBountiesContainter extends React.Component {
    constructor(props) {
        super(props);
        this.props.contract.instance.vortexMethods.isBountyVerified.data(
            1,
            {from: this.props.web3.coinbase}
        );
        Vortex.get().subscribeEvent(
            "BountyVerified", 
            this.props.contract_name, 
            this.props.contract_address);

        const mapStateToProps = (state) => {
            return {
                result: callContract(getContract(state, 
                    this.props.contract_name, 
                    this.props.contract_address),
                     "isBountyVerified", 
                     1,
                     {from: this.props.web3.coinbase}),
                update: (bountyId) => {
                    this.props.contract.instance.vortexMethods.verifyBounty.send(
                         bountyId, {from: this.props.web3.coinbase, gas: 6654755}
                    );
                }
            }
        };
        this.resultContainer = connect(VerifyBountyCallReturnContainer, mapStateToProps);
    }

    render() {
        if (this.props.contract) {
            return <Panel bsStyle="primary">
                <Panel.Heading>Verify Bounty (customers only)</Panel.Heading>
                <Panel.Body>
                    <this.resultContainer/>
                </Panel.Body>
            </Panel>;
        } else
            return <div/>;
    }

}

class WithdrawBountyCallReturnContainer extends React.Component {

    constructor(props) {
        super(props);
        this.bountyId = this.bountyId.bind(this);
    
    }

    bountyId(event){
        event.preventDefault();
        this.props.update(this.bountyI.value);
    }

    render() {
        return (<div>
             <p> BountyBalnace {this.props.result}</p>
            <form onSubmit={this.bountyId}>
                <FieldGroup
                    id="bountyI"
                    type="number"
                    label="Bounty Id"
                    placeholder="Bounty ID"
                    inputRef={input => this.bountyI = input}
                />
                <Button type="submit">Withdraw Bounty</Button>
            </form>
        </div>)
    }
}

class WithdrawBountiesContainter extends React.Component {
    constructor(props) {
        super(props);
        this.props.contract.instance.vortexMethods.withdrawBounty.data(
            1,
            {from: this.props.web3.coinbase}
        );
        Vortex.get().subscribeEvent(
            "BountyVerified", 
            this.props.contract_name, 
            this.props.contract_address);

        const mapStateToProps = (state) => {
            return {
                result: callContract(getContract(state, 
                    this.props.contract_name, 
                    this.props.contract_address),
                     "bountyBalance", 
                     1,
                     {from: this.props.web3.coinbase}),
                update: (bountyId) => {
                    this.props.contract.instance.vortexMethods.withdrawBounty.send(
                         bountyId, {from: this.props.web3.coinbase, gas: 6654755}
                    );
                }
            }
        };
        this.resultContainer = connect(VerifyBountyCallReturnContainer, mapStateToProps);
    }

    render() {
        if (this.props.contract) {
            return <Panel bsStyle="primary">
                <Panel.Heading>Verify Bounty (customers only)</Panel.Heading>
                <Panel.Body>
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
                <VortexContractsList element={BountiesContainter} contract_name="SmartBounty"/>
                <VortexContractsList element={CompleteBountiesContainter} contract_name="SmartBounty"/>
                <VortexContractsList element={VerifyBountiesContainter} contract_name="SmartBounty"/>
                {/* <VortexContractsList element={WithdrawBountiesContainter} contract_name="SmartBounty"/>
            */}
            </Panel.Body>
        </Panel>

        
    }

}
