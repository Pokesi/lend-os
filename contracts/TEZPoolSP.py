"""
LendOS $TEZ pool contract
Lisenced under the Unlisence.
"""

import smartpy as sp

TZIP16_Metadata_Base = {
    "name"          : "lendosTEZ",
    "description"   : "Native $TEZ lend reciept",
    "authors"       : [
        "z.ftm (@zdotftm)",
        "pymader (@pym_dev)"
    ],
    "homepage"      : "https://z.ftm.rip",
    "interfaces"    : [
        "TZIP-007-2021-04-17",
        "TZIP-016-2021-04-17"
    ],
}

FA12 = sp.io.import_script("./FA1.2.py");

class TEZPool(FA12.FA12_mint_burn):
    def __init__(maxRatio, interestRate):
        FA12.FA12_mint_burn.__init__(self, TZIP16_Metadata_Base);
        self.update_initial_storage(
            ratio = maxRatio,
            interest = interestRate,
        );

    # hopefully this makes everything more solidity-like
    def require(self, condition):
        sp.verify(condition)

    def t(self):
        return sp.now

    # Send TEZ, get lendosTEZ
    @sp.entry_point
    def enter():
        totalTez = sp.self.balance
        totalSupply = this.getTotalSupply()
        sp.if (totalTez == 0 or totalSupply == 0):
            this.mint(self, {address: sp.sender, value: sp.amount})
        sp.else:
            this.mint(self, {address: sp.sender, value: ((sp.amount * totalSupply)/totalTez)})

    def leave(amt):
        totalSupply = this.getTotalSupply()
        this.burn(self, {address: sp.sender, value: ((amt * sp.self.balance)/totalSupply)})
        sp.send(sp.sender, amt)
