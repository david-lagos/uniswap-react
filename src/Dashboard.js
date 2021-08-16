import React from 'react';
import Modal from './Modal';
import { ethers } from 'ethers';

class Dashboard extends React.Component {
    // State is managed from this component, every deal initializes to token data
    // and null amount values (balance and currency amount)
    constructor(props){
        super(props);
        this.state = {
            address: '',
            data:  [
                        {
                            token0: {
                                id: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
                                symbol: 'UNI',
                                decimals: 18,
                            },
                            token1: {
                                id: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
                                symbol: 'WETH',
                                decimals: 18,
                            },
                            amount0: null,
                            amount1: null,
                            balance0: null,
                            balance1: null,
                        },
                        {
                            token0: {
                                id: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
                                symbol: 'DAI',
                                decimals: 18,
                            },
                            token1: {
                                id: '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
                                symbol: 'USDC',
                                decimals: 6,
                            },
                            amount0: null,
                            amount1: null,
                            balance0: null,
                            balance1: null,
                        }
                    ],
                }
        
            }
    
    // After the component is mounted, this async function takes care of
    // setting a new state with address and balance information
    async componentDidMount() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        this.setState({address: address});
        for(let i=0; i<this.state.data.length; i++){
            this.setBalance0(i);
            this.setBalance1(i);
        }
    }

    // The renderModal function does a simple job of returning a Modal component
    // everytime it is called and passing the right deal by indexing the state
    renderModal(i) {

        return <Modal 
            address={this.state.address}
            token0={this.state.data[i].token0}
            token1={this.state.data[i].token1}
            amount0={this.state.data[i].amount0}
            amount1={this.state.data[i].amount1}
            balance0={this.state.data[i].balance0}
            balance1={this.state.data[i].balance1}
        />;
    }

    // Helper function setBalance0
    setBalance0(i) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const tokenContract = new ethers.Contract(
            this.state.data[i].token0.id,
            [
            'function approve(address spender, uint rawAmount) external returns (bool)',
            'function allowance(address owner, address spender) external view returns (uint)',
            'function balanceOf(address account) external view returns (uint)'
            ],
            signer
        );

        tokenContract.balanceOf(this.state.address).then(balance => {
            let dataCopy = this.state.data.slice();
            dataCopy[i].balance0 = parseFloat(ethers.utils.formatUnits(balance.toString(), this.state.data[i].token0.decimals)).toFixed(3);
            this.setState({data: dataCopy});
        });
    }

    // Helper function setBalance1
    setBalance1(i) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const tokenContract = new ethers.Contract(
            this.state.data[i].token1.id,
            [
            'function approve(address spender, uint rawAmount) external returns (bool)',
            'function allowance(address owner, address spender) external view returns (uint)',
            'function balanceOf(address account) external view returns (uint)'
            ],
            signer
        );

        tokenContract.balanceOf(this.state.address).then(balance => {
            let dataCopy = this.state.data.slice();
            dataCopy[i].balance1 = parseFloat(ethers.utils.formatUnits(balance.toString(), this.state.data[i].token1.decimals)).toFixed(3);;
            this.setState({data: dataCopy});
        });
    }

    // Render calls the components as they are needed, this is similar to
    // rendering the deals on the home page
    render() {
        return (
            <div>
                <div className="modal-block">
                    {this.renderModal(0)}
                </div>
                <div className="modal-block">
                    {this.renderModal(1)}
                </div>
            </div>
        );    
    }    
}

export default Dashboard;