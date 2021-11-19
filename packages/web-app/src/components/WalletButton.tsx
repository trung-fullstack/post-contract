
import {
  Button, ButtonProps
} from "@chakra-ui/react";
import { useContract } from "../providers/ContractProvider";

export default function WalletButton(props: ButtonProps) {
  const { isConnected, connectWallet, disconnectWallet } = useContract();

  const handleOnClick = () => {
    if (!isConnected) {
      connectWallet();
    } else {
      disconnectWallet();
    }
  };
  return (
    <Button
      {...props}
      onClick={handleOnClick}
    >
      {isConnected ? "Disconnect" : "Connect Wallet"}
    </Button>
  );
}
