import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Wallet, ChevronRight, Download } from "lucide-react";

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  onError?: (error: string) => void;
}

const WalletConnect = ({
  onConnect = () => {},
  onError = () => {},
}: WalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("metamask");

  const handleConnect = async (walletType: string) => {
    setIsConnecting(true);
    setError(null);

    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful connection
      const mockAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
      onConnect(mockAddress);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect wallet";
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[400px] bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Connect Wallet
          </CardTitle>
          <CardDescription className="text-center">
            Connect your wallet to access the Web3 CMS
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs
            defaultValue="metamask"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="metamask">MetaMask</TabsTrigger>
              <TabsTrigger value="walletconnect">WalletConnect</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>

            <TabsContent value="metamask" className="space-y-4">
              <div className="flex items-center justify-center p-6 border rounded-md bg-muted/30">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                  alt="MetaMask"
                  className="w-16 h-16"
                />
              </div>
              <Button
                className="w-full"
                onClick={() => handleConnect("metamask")}
                disabled={isConnecting}
              >
                {isConnecting ? "Connecting..." : "Connect with MetaMask"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>

            <TabsContent value="walletconnect" className="space-y-4">
              <div className="flex items-center justify-center p-6 border rounded-md bg-muted/30">
                <img
                  src="https://1000logos.net/wp-content/uploads/2022/05/WalletConnect-Logo.png"
                  alt="WalletConnect"
                  className="w-32 h-16 object-contain"
                />
              </div>
              <Button
                className="w-full"
                onClick={() => handleConnect("walletconnect")}
                disabled={isConnecting}
              >
                {isConnecting ? "Connecting..." : "Connect with WalletConnect"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>

            <TabsContent value="other" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 p-4"
                  onClick={() => handleConnect("coinbase")}
                  disabled={isConnecting}
                >
                  <img
                    src="https://seeklogo.com/images/C/coinbase-wallet-logo-9F9BF5D8D3-seeklogo.com.png"
                    alt="Coinbase Wallet"
                    className="w-10 h-10 mb-2"
                  />
                  <span className="text-xs">Coinbase</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 p-4"
                  onClick={() => handleConnect("trustwallet")}
                  disabled={isConnecting}
                >
                  <img
                    src="https://trustwallet.com/assets/images/media/assets/trust_platform.png"
                    alt="Trust Wallet"
                    className="w-10 h-10 mb-2"
                  />
                  <span className="text-xs">Trust Wallet</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col space-y-4 pt-4">
          <div className="text-sm text-muted-foreground text-center w-full">
            Don't have a wallet yet?
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              window.open("https://metamask.io/download/", "_blank")
            }
          >
            <Download className="mr-2 h-4 w-4" />
            Install MetaMask
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WalletConnect;
