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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Edit, Trash2, Filter, ArrowUpDown } from "lucide-react";
import CreateContentDialog from './CreateContentDialog';
import { truncateAddress } from '@/utils/truncateAddress';
import dayjs from 'dayjs';

interface ContentItem {
  id: string;
  title: string;
  type: string;
  content: string;
  imageUrl: string;
  status: "published" | "draft" | "archived";
  author: string;
  createdAt: string;
  updatedAt: string;
}

const ContentManager = ({
  userAddress = "0x1234...5678",
  userRole = "admin",
  data = [],
  loading = false,
  searchQuery = "",
  setSearchQuery,
}: {
  userAddress?: string;
  userRole?: string;
  data?: any[];
  loading?: boolean;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock content data
  // const contentItems: ContentItem[] = [
  //   {
  //     id: "1",
  //     title: "Getting Started with Web3",
  //     type: "article",
  //     status: "published",
  //     author: "0x1234...5678",
  //     createdAt: "2023-06-15",
  //     updatedAt: "2023-06-16",
  //   },
  //   {
  //     id: "2",
  //     title: "Understanding Smart Contracts",
  //     type: "tutorial",
  //     status: "draft",
  //     author: "0x1234...5678",
  //     createdAt: "2023-06-18",
  //     updatedAt: "2023-06-18",
  //   },
  //   {
  //     id: "3",
  //     title: "Blockchain Security Best Practices",
  //     type: "guide",
  //     status: "published",
  //     author: "0x9876...4321",
  //     createdAt: "2023-06-10",
  //     updatedAt: "2023-06-14",
  //   },
  //   {
  //     id: "4",
  //     title: "NFT Marketplace Overview",
  //     type: "article",
  //     status: "archived",
  //     author: "0x1234...5678",
  //     createdAt: "2023-05-20",
  //     updatedAt: "2023-06-01",
  //   },
  // ];

  const contentItems = data;

  const filteredItems = contentItems.filter((item) => {
    // Filter by tab
    if (activeTab !== "all" && item.status !== activeTab) return false;

    // Filter by search query
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  const handleEdit = (item: ContentItem) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: ContentItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "archived":
        return <Badge variant="secondary">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>
                Create, edit, and manage your content
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search content..."
                  className="pl-8 w-[200px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> New Content
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger disabled value="published">Published</TabsTrigger>
              <TabsTrigger disabled value="draft">Drafts</TabsTrigger>
              <TabsTrigger disabled value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">
                        Title
                      </TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          Loading...
                        </TableCell>
                      </TableRow> : <>{filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.title}
                          </TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell className="text-sm">
                            {item.author === userAddress ? "You" : truncateAddress(item.author)}
                          </TableCell>
                          <TableCell>{dayjs.unix(item.updatedAt).format('DD/MM/YYYY')}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(item)}
                                disabled={
                                  userRole !== "admin" &&
                                  item.author !== userAddress
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(item)}
                                disabled={
                                  userRole !== "admin" &&
                                  item.author !== userAddress
                                }
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No content found.
                        </TableCell>
                      </TableRow>
                    )}</>}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {contentItems.length} items
          </div>
          <div className="flex items-center gap-2">
            <Button disabled variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Select defaultValue="10">
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardFooter>
      </Card>

      {/* Create Content Dialog */}
      <CreateContentDialog isCreateDialogOpen={isCreateDialogOpen} setIsCreateDialogOpen={setIsCreateDialogOpen} />

      {/* Edit Content Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
            <DialogDescription>
              Make changes to your content item.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-title" className="text-sm font-medium">
                  Title
                </label>
                <Input id="edit-title" defaultValue={selectedItem.title} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Image
                </label>
                <Input id="image" placeholder="Enter image URL" defaultValue={selectedItem.imageUrl} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-type" className="text-sm font-medium">
                  Content Type
                </label>
                <Select defaultValue={selectedItem.type}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="Tutorial">Tutorial</SelectItem>
                    <SelectItem value="Guide">Guide</SelectItem>
                    <SelectItem value="News">News</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-content" className="text-sm font-medium">
                  Content
                </label>
                <Textarea
                  id="edit-content"
                  placeholder="Content goes here..."
                  className="min-h-[150px]"
                  defaultValue={selectedItem.content}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-status" className="text-sm font-medium">
                  Status
                </label>
                <Select defaultValue={selectedItem.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this content item? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="py-4">
              <p className="font-medium">{selectedItem.title}</p>
              <p className="text-sm text-muted-foreground">
                Type: {selectedItem.type}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManager;
