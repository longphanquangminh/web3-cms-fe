import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sun,
  Moon,
  LogOut,
  Settings,
  FileText,
  Home,
  Users,
  LayoutDashboard,
} from "lucide-react";
import ContentManager from "../content/ContentManager";

interface DashboardProps {
  walletAddress?: string;
  ensName?: string;
  connectionStatus?: "connected" | "disconnected" | "connecting";
  onDisconnect?: () => void;
  onToggleTheme?: () => void;
  isDarkMode?: boolean;
}

const Dashboard = ({
  walletAddress = "0x1234...5678",
  ensName = "user.eth",
  connectionStatus = "connected",
  onDisconnect = () => {},
  onToggleTheme = () => {},
  isDarkMode = false,
}: DashboardProps) => {
  const [activeTab, setActiveTab] = React.useState("dashboard");

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-card p-4">
        <div className="flex items-center gap-2 mb-8">
          <LayoutDashboard className="h-6 w-6" />
          <h1 className="text-xl font-bold">Web3 CMS</h1>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant={activeTab === "dashboard" ? "default" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("dashboard")}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === "content" ? "default" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("content")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Content
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("users")}
          >
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        <div className="mt-auto">
          <Separator className="my-4" />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${walletAddress}`}
                />
                <AvatarFallback>WA</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">
                  {ensName || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {walletAddress}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={onToggleTheme}
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={onDisconnect}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            <h1 className="text-xl font-bold">Web3 CMS</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onToggleTheme}>
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={onDisconnect}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "content" && "Content Management"}
                {activeTab === "users" && "User Management"}
                {activeTab === "settings" && "Settings"}
              </h1>
              <p className="text-muted-foreground">
                {connectionStatus === "connected" && (
                  <span className="flex items-center gap-2">
                    Connected as {ensName || walletAddress}
                    <Badge
                      variant="outline"
                      className="ml-2 bg-green-500/10 text-green-500 border-green-500/20"
                    >
                      Connected
                    </Badge>
                  </span>
                )}
                {connectionStatus === "connecting" && (
                  <span className="flex items-center gap-2">
                    Connecting wallet...
                    <Badge
                      variant="outline"
                      className="ml-2 bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    >
                      Connecting
                    </Badge>
                  </span>
                )}
                {connectionStatus === "disconnected" && (
                  <span className="flex items-center gap-2">
                    Wallet disconnected
                    <Badge
                      variant="outline"
                      className="ml-2 bg-red-500/10 text-red-500 border-red-500/20"
                    >
                      Disconnected
                    </Badge>
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Information</CardTitle>
                  <CardDescription>
                    Your connected wallet details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Address:</span>
                      <span className="font-mono">{walletAddress}</span>
                    </div>
                    {ensName && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ENS Name:</span>
                        <span>{ensName}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span>
                        <Badge
                          variant={
                            connectionStatus === "connected"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {connectionStatus}
                        </Badge>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent actions in the CMS
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">Content item created</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        2m ago
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Content item updated</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        1h ago
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span className="text-sm">User role changed</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        3h ago
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks you can perform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Create New Content
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Configure Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === "content" && <ContentManager />}

          {/* Users Tab */}
          {activeTab === "users" && (
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage users and their permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  User management functionality will be implemented here.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your CMS settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Theme</p>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark mode
                      </p>
                    </div>
                    <Button variant="outline" onClick={onToggleTheme}>
                      {isDarkMode ? (
                        <Sun className="h-4 w-4 mr-2" />
                      ) : (
                        <Moon className="h-4 w-4 mr-2" />
                      )}
                      {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Wallet Connection</p>
                      <p className="text-sm text-muted-foreground">
                        Manage your wallet connection
                      </p>
                    </div>
                    <Button variant="outline" onClick={onDisconnect}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Disconnect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
