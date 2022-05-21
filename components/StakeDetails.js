// how many tokens are in the wallet
// how many token are staked
// home nay token we have earned
import { useMoralis, useWeb3Contract } from "react-moralis"
import { stakingAddress, stakingAbi, rewardTokenAbi, rewardTokenAddress } from "./constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"


export default function StakeDetails() {
    const { account, isWeb3Enabled } = useMoralis()
    const [rtBalance, setRtBalance] = useState("0")

    const { runContractFunction: getRtBalance } = useWeb3Contract({
        abi: rewardTokenAbi,
        contractAddress: rewardTokenAddress,
        functionName: "balanceOf",
        params: {
            account: account,
        }
    })
    useEffect(() => {
        // update the UI and get balance
        if(isWeb3Enabled && account) {
            updateUiValues() 
        }
    }, [account, isWeb3Enabled])

    async function updateUiValues() {
        const rtBalanceFromContract = (
            await getRtBalance({ onError: (error) => console.log(error) })
            ).toString()
        const formattedRtBalanceFromContract = ethers.utils.formatUnits(
            rtBalanceFromContract, "ether"
            )
        setRtBalance(formattedRtBalanceFromContract)
    }

    console.log(account)
    // reward token address
    // reward token ABI
    return(<div>RT Balance is: {rtBalance}</div>)
}