# LendOS
## For Tezos

LendOS is a decentralized, permission less and liquidation-free lending protocol designed for Tezos. Written in JSLigo, it is configurable with two parameters (maxBorrowRatio and rate), and facilitates the borrowing and lending of native XTZ.

All work in this repo is licensed under the MIT license unless otherwise stated, or work is not by z.ftm (or any pseudonyms, such as Pokesi, RandomZ, etc.)

## Contract Addresses
(interest rate, max borrow, asset) name: `address`
(10,85,XTZ) XTZ pool: `KT1APaPzy7h9hib3XRepxnnRr7NKTFLdcbyf`

## Use LendOS on testnet
[Link to UI](https://lend-os.vercel.app)

## UI can be found under [website](../website)

## Steps to completion:
1) Allow users to deploy their own pools with configurable max borrow ratios and interest rates
2) Allow the borrowing and lending of FA2 fungible tokens
3) Allow users to repay only parts of their positions
4) Implement the FA2 standard
5) Dynamic pools using the UI (put the address of a pool in the URL and have the UI work with that contract)
6) Gas optimization


### Technology used:
 - ReactJS
 - JSLigo
 - Taquito
 - Beacon

### Technology used to develop:
 - [better call dev](https://better-call.dev)
 - [Ligo IDE](https://ide.ligolang.org)

### Special thanks:

 - @tom and @Melwyn in the Ligo chats, for all the help!
