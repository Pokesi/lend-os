import logo from './logo.svg';
import './App.css';
import React from "react";
import Console from "./Console/dist";
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-sdk";

// KT1WQ3YrBU2tm9CckULXp27eGJmEmNWisJrm

const Tezos = new TezosToolkit('https://rpc.tzkt.io/ghostnet');
const options = {
  name: "LendOS",
  iconUrl: "https://cryptologos.cc/logos/tezos-xtz-logo.svg?v=023",
  prefferedNetwork: 'ghostnet'
}
const wallet = new BeaconWallet(options);
const contract_at = "KT1WQ3YrBU2tm9CckULXp27eGJmEmNWisJrm";

function App() {
  const [history, setHistory] = React.useState([
    "@rave_names"
  ]);

  const [w, s]  = React.useState();
  const [contract, setContract] = React.useState();

  const o = async () => {
    wallet.requestPermissions({ network: { type: 'ghostnet' } });
    const activeAccount = await wallet.client.getActiveAccount();
    Tezos.setWalletProvider(wallet);
    setContract(await Tezos.wallet.at(contract_at));
    console.log(activeAccount);
    s(activeAccount.address);
  }

  React.useEffect(() => {
    o();
  }, []);

  const appendToHistory = (s) => {
    setHistory([...history, s]);
  }

  return (
    <Console
        id="console"
        autoFocus={true}
        prompt={` C:\LendOS>`}
        history={history}
        onAddHistoryItem={appendToHistory}
        welcomeMessage={`LendOS [Version 0.1.0]\r\n(c) z.ftm. All rights reserved.\r\n

Commands:
balance     Get the balance of shares you can withdraw
borrow      Borrow XTZ
connect     Connect your wallet using Beacon
deposit     Deposit XTZ
echo        Print text
help        Get help
info        Get pool info
interest    Get your interest to be paid
repay       Repay a borrow + interest
withdraw    Withdraw XTZ

Type "help" for more information on each command`}
        noCommandFound={(s) => `'${s}' is not recognized as an internal or external command, operable program or batch file.`}
        commands={{
          history: {
            description: 'History',
            fn: () => new Promise(resolve => {
               resolve(`${history.join('\r\n')}`)
            })
          },
          echo: {
            description: 'Echo',
            fn: (...args) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(`${args.join(' ')}`)
                }, 0)
              })
            }
          },
          connect: {
            description: 'Connect',
            fn: (...args) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  o();
                  resolve(`Connected as ${w}`)
                }, 0)
              })
            }
          },
          help: {
            description: "Help",
            fn: (...args) => {
              return new Promise((resolve, reject) => {
                resolve(`
COMMAND     DESCRIPTION                        SYNTAX
=====================================================================================================================================
balance     Get your balance of shares         balance
borrow      Borrow XTZ                         borrow {amount}
connect     Connect your wallet using Beacon   connect
deposit     Deposit XTZ                        deposit {amount}
echo        Print text                         echo {text} {text} {...}
help        Get help                           help
info        Get pool info                      info
interest    Get your interest to be paid       interest
repay       Repay a borrow + interest          repay
withdraw    Withdraw XTZ                       withdraw {shares} (shares are the amount of XTZ you deposited, not including rewards)
`)
              })
            }
          },
          info: {
            description: 'Get pool info',
            fn: (...args) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(`LendOS permissionless XTZPool v0.1
====================================================
Interest Rate: 10% per annum
----------------------------------------------------
Max Borrow Ratio: 84.99%
----------------------------------------------------
UI Fee (fee added to repayments by the UI): 1 ???
----------------------------------------------------
Deployer: tz1V1b5238Dxd4xvoNAHJemVB9R8mrqCLZXX
----------------------------------------------------
`)
                }, 0)
              })
            }
          },
          interest: {
            description: 'Get interestAccrued',
            fn: (...args) => {
              return new Promise(async (resolve, reject) => {
                try {
                  const time = () => Math.round((new Date()).getTime() / 1000);
                  const t2u = (t) => Math.round((new Date(t)).getTime() / 1000);
                  const storage = await contract.storage();
                  console.log(storage)
                  const positions = storage.positions.valueMap;
                  const position = positions.get(`"${args[0] || w}"`);
                  console.log(position)
                  const interestAccrued = (((85 * ((time() - t2u(position.startTime))/31556926)) * position.amount)/100);
                  resolve(`${interestAccrued/100_000_000_000} ???`)
                } catch (e) {
                  resolve(e);
                }
              })
            }
          },
          balance: {
            description: 'Get balance',
            fn: (...args) => {
              return new Promise(async (resolve, reject) => {
                try {
                  const peepoPogWow = await Tezos.tz.getBalance(contract_at);
                  const storage = await contract.storage();
                  console.log(storage, peepoPogWow, storage.ledger.totalSupply)
                  const balances = storage.ledger.balances.valueMap;
                  const balance = balances.get(`"${args[0] || w}"`);
                  console.log(peepoPogWow)
                  resolve(`You hold: ${balance.div(1_000_000)} LendOS???
The current LendOSXTZ/XTZ rate is ${peepoPogWow.div(storage.ledger.totalSupply)}`)
                } catch (e) {
                  resolve(e);
                }
              })
            }
          },
          deposit: {
            description: 'Deposit XTZ',
            fn: (...args) => {
              return new Promise(async (resolve, reject) => {
                setTimeout(async () => {
                  console.log(args);
                  let tx;
                  const action = async () => {
                    try {
                      const c = await contract.methods.enter().send({ amount: args[0]});
                      tx = `Sent with txhash ${c.opHash}`;
                    } catch (e) {
                      tx = "Error: " + e.message
                    }
                  };

                  await action();

                  resolve(`${tx}`);
                }, 0)
              })
            }
          },
          withdraw: {
            description: 'Withdraw XTZ',
            fn: (...args) => {
              return new Promise(async (resolve, reject) => {
                console.log(args);
                let tx;
                const action = async () => {
                  try {
                    const storage = await contract.storage();
                    const balances = storage.ledger.balances.valueMap;
                    const balance = balances.get(`"${args[0] || w}"`);
                    const x = Math.floor(parseFloat(args[0]) * 1_000_000);
                    if (balance.lte(x)) { resolve(new Error("XTZPool: You do not have enough LendOSXTZ to withdraw this much"))}
                    console.log(x);
                                                                            // mutez to tez
                    const c = await contract.methods.leave(x).send();
                    tx = `Sent with txhash ${c.opHash}`;
                  } catch (e) {
                    tx = "Error: " + e.message
                  }
                };

                await action();

                resolve(`${tx}`);
              })
            }
          },
          borrow: {
            description: 'Borrow XTZ',
            fn: (...args) => {
              return new Promise(async (resolve, reject) => {
                setTimeout(async () => {
                  console.log(args);
                  let tx;
                  const action = async () => {
                    try {
                      const c = await contract.methods.borrow(parseFloat(args[0]) * 1000000).send();
                      tx = `Sent with txhash ${c.opHash}`;
                    } catch (e) {
                      tx = "Error: " + e.message
                    }
                  };

                  await action();

                  resolve(`${tx}`);
                }, 0)
              })
            }
          },
          repay: {
            description: 'Repay XTZ',
            fn: (...args) => {
              return new Promise(async (resolve, reject) => {
                setTimeout(async () => {
                  console.log(args);
                  let tx;
                  const time = () => Math.round((new Date()).getTime() / 1000);
                  const t2u = (t) => Math.round((new Date(t)).getTime() / 1000);
                  const storage = await contract.storage();
                  console.log(storage)
                  const positions = storage.positions.valueMap;
                  const position = positions.get(`"${w}"`);
                  console.log(position)
                  const interestAccrued = (((85 * ((time() - t2u(position.startTime))/31556926)) * position.amount)/100);
                  console.log(interestAccrued)
                  console.log(((interestAccrued)/1_000_000))
                  const action = async () => {
                    try {
                      const c = await contract.methods.repay().send({amount: Math.ceil((position.amount + ((interestAccrued)/1_000_000))/10_000_000+1)});
                      tx = `Sent with txhash ${c.opHash}`;
                    } catch (e) {
                      tx = "Error: " + e.message
                    }
                  };

                  await action();

                  resolve(`${tx}`);
                }, 0)
              })
            }
          },
        }}
    />
  );
}

export default App;
