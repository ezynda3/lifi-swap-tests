import hre, { ethers } from 'hardhat'

const ONE_INCH_CONTRACT = '0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E'
const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f'
const LINK = '0x514910771af9ca656af840dff83e8264ecf986ca'
const DAI_WHALE = '0x2fEb1512183545f48f6b9C5b4EbfCaF49CfCa6F3'

describe('Swapper', function () {
	it('performs a swap on 1inch', async () => {
		await hre.network.provider.request({
 			method: "hardhat_impersonateAccount",
  		params: [DAI_WHALE],
		});
		const signer = await ethers.getSigner(DAI_WHALE)
	
		const SwapperFactory = await ethers.getContractFactory('Swapper')
		const swapper = await SwapperFactory.deploy(ONE_INCH_CONTRACT)
		await swapper.deployed()

		// Approve
		const daiToken = await ethers.getContractAt('IERC20', DAI)
		await daiToken.connect(signer).approve(swapper.address, ethers.utils.parseEther('10000'))

		let daiBalance = await daiToken.balanceOf(DAI_WHALE)
		console.log("Dai Balance: ", daiBalance.toString())

		const linkToken = await ethers.getContractAt('IERC20', LINK)
		let linkBalance = await linkToken.balanceOf(DAI_WHALE)
		console.log('Link Balance: ', linkBalance.toString())

		// Swap
		await swapper.connect(signer).swapOneInch(DAI, LINK, ethers.utils.parseEther('10000'))

		daiBalance = await daiToken.balanceOf(DAI_WHALE)
		console.log("Dai Balance: ", daiBalance.toString())

		linkBalance = await linkToken.balanceOf(DAI_WHALE)
		console.log('Link Balance: ', linkBalance.toString())
  }) 
})
