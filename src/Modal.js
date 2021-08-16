import React from 'react';
import Balance from './Balance';

class Modal extends React.Component {
    render(){
        return(
            <div>
                <div>
                    {this.props.token0.symbol}/{this.props.token1.symbol} 
                </div>
                <div>
                    <label>Amount {this.props.token0.symbol}</label>
                    <input value={this.props.amount0}/> 
                    <Balance 
                    token={this.props.token0}
                    balance={this.props.balance0}
                    address={this.props.address}
                    />
                </div>
                <div>
                    <label>Amount {this.props.token1.symbol}</label>
                    <input value={this.props.amount1}/>
                    <Balance 
                    token={this.props.token1}
                    balance={this.props.balance1}
                    address={this.props.address}
                    />
                </div>
                <div>
                    <button>Add Liquidity</button>
                </div>
            </div>
        );
    }
}   

export default Modal;