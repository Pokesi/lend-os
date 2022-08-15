import smartpy as sp

# import the harbinger oracle
Oracle = sp.io.import_file_from_url("https://raw.githubusercontent.com/Hover-Labs/kolibri-contracts/master/smart_contracts/oracle.py")
# import the FA1.2 standard
FA1_2 = sp.io.import_file_from_url("file:FA1.2.py")

# TODO: implementation of the FA1.2 standard (and eventually FA2)
class Pool(FA1_2.FA12_mint_burn):
    def __init__(interest, metadata):
        FA12_mint_burn.__init__(self, metadata);
        self.update_initial_storage(
            hasPos = {},
            pos = {},
            interest = interest
        )

    """
    These 2 functions basically handle entering the pool and exiting the pool. Based on xSUSHI code.
    They allow for the ratio of XTZ:lendosXTZ to be 1:>1
    """

    # Send XTZ, get lendosXTZ
    @sp.entry_point
    def enter():
        # verify that the user has no open borrows
        if (self.data.hasPos[sp.sender]): sp.verify(self.data.hasPos[sp.sender])
        totalTez = sp.self.balance
        totalSupply = this.getTotalSupply()
        sp.if (totalTez == 0 or totalSupply == 0):
            this.mint({address: sp.sender, value: sp.amount})
        sp.else:
            this.mint({address: sp.sender, value: ((sp.amount * totalSupply)/totalTez)})

    # redeem lendosTEZ for TEZ
    @sp.entry_point
    def leave(amt):
        # verify that there is enough TEZ to pay out
        sp.verify(sp.self.balance >= amt)
        # verify that the user has no open borrows (because then borrows could become uncollateralized)
        if (self.data.hasPos[sp.sender]): sp.verify(self.data.hasPos[sp.sender])
        totalSupply = this.getTotalSupply()
        this.burn({address: sp.sender, value: amt})
        sp.send(sp.sender, ((amt * sp.self.balance)/totalSupply))

    # get the amount of XTZ someone has in the contract, including fees earned
    @sp.utils.view(sp.TNat)
    def xtzBalance(self, user):
        losxtz = getBalance(user)
        totallosxtz = getTotalSupply()
        sp.result((losxtz * sp.self.balance)/totallosxtz)

    # borrow {amt} of XTZ
    @sp.entry_point
    def borrow(amt):
        # verify that the user has no positions open
        sp.verify(!self.data.hasPos[sp.sender])
        # verify that the user has enough collateral to borrow
        sp.verify(xtzBalance(sp.sender) <= amt)
        # open position
        self.data.hasPos[sp.sender] = True
        self.data.pos[sp.sender] = {
            amount: amt,
            startTime: sp.now
        }
        # send the requested XTZ
        sp.send(sp.sender, amt)

    # repay a borrow in full
    @sp.entry_point
    def repay():
        # verify that the user has a position open
        sp.verify(self.data.hasPos[sp.sender])
        # verify that the user is paying back the loan + interest
        # interest is calculated by (interest * loan amount)/100
        interestAccrued = ((interest * self.data.pos[sp.sender].amount == sp.amount)/100)
        sp.verify((self.data.pos[sp.sender].amount + interestAccrued) == sp.amount)
        # close the position, stop accruing interest
        self.data.hasPos[sp.sender] = False
        self.data.pos[sp.sender] = {
            amount: 0,
            startTime: 0
        }

    # override some functions to dissallow approval/transfer if there is a position open
    @sp.entry_point
    def transfer(self, params):
        sp.set_type(params, sp.TRecord(from_ = sp.TAddress, to_ = sp.TAddress, value = sp.TNat).layout(("from_ as from", ("to_ as to", "value"))))
        sp.verify(self.is_administrator(sp.sender) |
            (~self.is_paused() &
                ((params.from_ == sp.sender) |
                 (self.data.balances[params.from_].approvals[sp.sender] >= params.value))), FA1_2.FA12_Error.NotAllowed)
        self.addAddressIfNecessary(params.from_)
        self.addAddressIfNecessary(params.to_)
        sp.verify(!self.data.hasPos[params.from_], FA1_2.FA12_Error.InsufficientBalance)
        sp.verify(self.data.balances[params.from_].balance >= params.value, FA1_2.FA12_Error.InsufficientBalance)
        self.data.balances[params.from_].balance = sp.as_nat(self.data.balances[params.from_].balance - params.value)
        self.data.balances[params.to_].balance += params.value
        sp.if (params.from_ != sp.sender) & (~self.is_administrator(sp.sender)):
            self.data.balances[params.from_].approvals[sp.sender] = sp.as_nat(self.data.balances[params.from_].approvals[sp.sender] - params.value)
