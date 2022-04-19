const { ethers } = require("hardhat");

const BRL_CHEF_ABI = `[{"type":"constructor","stateMutability":"nonpayable","inputs":
                        [{"type":"address","name":"_BRL","internalType":"contract BRLToken"},
                        {"type":"address","name":"_devaddr","internalType":"address"},
                        {"type":"address","name":"_feeAddress","internalType":"address"},
                        {"type":"uint256","name":"_BRLPerBlock","internalType":"uint256"},
                        {"type":"uint256","name":"_startBlock","internalType":"uint256"}]},
                        {"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},
                        {"type":"uint256","name":"pid","internalType":"uint256","indexed":true},
                        {"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],
                        "anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},
                        {"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],
                        "anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},
                        {"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":
                        [{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},
                        {"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},
                        {"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],
                        "name":"BONUS_MULTIPLIER","inputs":[]},{"type":"function","stateMutability":"view","outputs":
                        [{"type":"address","name":"","internalType":"contract BRLToken"}],"name":"BRL","inputs":[]},
                        {"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"BRLPerBlock","inputs":[]},
                        {"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IBEP20"},{"type":"uint16","name":"_depositFeeBP","internalType":"uint16"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"dev","inputs":[{"type":"address","name":"_devaddr","internalType":"address"}]},
                        {"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devaddr","inputs":[]},
                        {"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":
                        [{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":
                        [{"type":"address","name":"","internalType":"address"}],"name":"feeAddress","inputs":[]},{"type":"function","stateMutability":"view","outputs":
                        [{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMultiplier","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},
                        {"type":"uint256","name":"_to","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],
                        "name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],
                        "name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],
                        "name":"pendingBRL","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},
                        {"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":
                        [{"type":"address","name":"lpToken","internalType":"contract IBEP20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardBlock","internalType":"uint256"},{"type":"uint256","name":"accBRLPerShare","internalType":"uint256"},{"type":"uint16","name":"depositFeeBP","internalType":"uint16"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"uint16","name":"_depositFeeBP","internalType":"uint16"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setFeeAddress","inputs":[{"type":"address","name":"_feeAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateEmissionRate","inputs":[{"type":"uint256","name":"_BRLPerBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}]`;


async function main() {
    const BRL_CHEF_ADDR = "0x35CC71888DBb9FfB777337324a4A60fdBAA19DDE";
    const BRL_CHEF = await ethers.getContractAt("BRLMasterChef", BRL_CHEF_ADDR);
    const currentBlock = await ethers.provider.getBlock("latest");
    const multiplier = await BRL_CHEF.getMultiplier(currentBlock.number, currentBlock.number + 1);
    let poolInfo = await BRL_CHEF.poolInfo(1);
    let totalAllocPoint = await BRL_CHEF.totalAllocPoint();
    const stakedTVLInPrice = 183006;
    const brlCurrentPrice = 0.96;
    const rewardsPerWeek = await BRL_CHEF.BRLPerBlock() /1e18
        * multiplier * 604800 / 1.1;
    let poolRewardsPerWeek = poolInfo.allocPoint / totalAllocPoint * rewardsPerWeek;
    let usdPerWeek = poolRewardsPerWeek * brlCurrentPrice;
    let weeklyAPR = (usdPerWeek / stakedTVLInPrice) * 100;
    let yearlyAPR = weeklyAPR * 52;
    console.log(yearlyAPR);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });