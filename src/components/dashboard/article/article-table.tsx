"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetArticlesQuery } from "@/services/article/aritcle-api";
import {
  AlertCircle,
  Edit,
  Filter,
  MoreHorizontal,
  Search,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { DeleteArticleDialog } from "./delete-article-dailog";
import { UpdateArticleDialog } from "./update-article-dialog";

const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800";
    case "draft":
      return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800";
    case "archived":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800";
  }
};

interface Article {
  id: number;
  Title: string;
  status: string;
  featured_image_url?: string | null;
  date_updated?: string | null;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

interface ArticleTableProps {
  searchValue?: string;
  statusFilter?: string;
}

export function ArticleTable({
  searchValue = "",
  statusFilter = "all",
}: ArticleTableProps) {
  const { data, error, isLoading } = useGetArticlesQuery();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);
  const [localStatusFilter, _] = useState(statusFilter);

  const filteredArticles = useMemo(() => {
    if (!data?.data) return [];

    let filtered = data.data;

    const searchTerm = (localSearchValue || searchValue).trim();
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter((article) => {
        const titleMatch =
          article.Title?.toLowerCase().includes(searchTermLower) || false;
        const idMatch =
          article.id?.toString().includes(searchTermLower) || false;
        const imageMatch =
          article.featured_image_url?.toLowerCase().includes(searchTermLower) ||
          false;

        return titleMatch || idMatch || imageMatch;
      });
    }

    const currentStatusFilter = localStatusFilter || statusFilter;
    if (currentStatusFilter !== "all") {
      filtered = filtered.filter(
        (article) => article.status === currentStatusFilter
      );
    }

    return filtered;
  }, [
    data?.data,
    searchValue,
    statusFilter,
    localSearchValue,
    localStatusFilter,
  ]);

  const handleEditClick = (article: Article) => {
    setSelectedArticle(article);
    setUpdateDialogOpen(true);
  };

  const handleDeleteClick = (article: Article) => {
    setSelectedArticle(article);
    setDeleteDialogOpen(true);
  };

  const handleDialogSuccess = () => {
    console.log("Operation successful - would refetch data");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="space-y-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-4 border-b last:border-b-0"
                >
                  <Skeleton className="h-12 w-16 rounded-lg" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[120px]" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search Group"
              value={localSearchValue}
              onChange={(e) => setLocalSearchValue(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Filter className="h-4 w-4" />
              San Francisco, LA
            </Button>
            <Button variant="outline" size="sm">
              select data
            </Button>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load articles. Please try again later.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  const articles = filteredArticles;

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b bg-muted/30">
                  <TableHead className="w-12 text-center font-medium text-muted-foreground">
                    #
                  </TableHead>
                  <TableHead className="font-medium text-muted-foreground">
                    Article
                  </TableHead>
                  <TableHead className="font-medium text-muted-foreground">
                    Date Created
                  </TableHead>
                  <TableHead className="font-medium text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="font-medium text-muted-foreground">
                    Image
                  </TableHead>
                  <TableHead className="text-center font-medium text-muted-foreground">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-12 text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <Search className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="font-medium">
                          {localSearchValue || localStatusFilter !== "all"
                            ? "No articles match your filters"
                            : "No articles found"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  articles.map((article, index) => (
                    <TableRow
                      key={article.id}
                      className="border-b last:border-b-0 hover:bg-muted/20 transition-colors"
                    >
                      <TableCell className="text-center text-sm text-muted-foreground font-medium">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="min-w-0 flex-1">
                            <p
                              className="font-medium text-foreground truncate max-w-[200px]"
                              title={article.Title}
                            >
                              {article.Title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ID: {article.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {article.date_updated ? (
                          <div className="text-sm text-muted-foreground">
                            {formatDate(article.date_updated)}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Never
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(
                            article.status
                          )} font-medium px-2.5 py-1 text-xs border`}
                        >
                          {article.status === "published"
                            ? "Completed"
                            : article.status === "draft"
                            ? "Pending"
                            : article.status === "archived"
                            ? "Delay"
                            : article.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted border-2 border-background shadow-sm">
                          {article.featured_image_url ? (
                            <Image
                              src={
                                article.featured_image_url || "/placeholder.svg"
                              }
                              alt={article.Title}
                              width={32}
                              height={32}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                              <span className="text-[10px] font-medium">
                                {/* {article.Title.charAt(0).toUpperCase()} */}
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-muted"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              onClick={() => handleEditClick(article)}
                              className="gap-2"
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(article)}
                              className="gap-2 text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <UpdateArticleDialog
        article={selectedArticle}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        onSuccess={handleDialogSuccess}
      />

      <DeleteArticleDialog
        article={selectedArticle}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onSuccess={handleDialogSuccess}
      />
    </div>
  );
}
