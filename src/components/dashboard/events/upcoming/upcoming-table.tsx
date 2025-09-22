"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGeteventsQuery } from "@/services/event/event-api";
import { AlertCircle, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { DeleteUpcomingDialog } from "./delete-upcoming";

const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "draft":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "archived":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

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

interface EventArticle {
  id: number;
  title: string;
  location: string;
  date_updated?: string;
  image?: string | null;
}

export function UpcomingTable({
  searchValue = "",
  statusFilter = "all",
}: ArticleTableProps) {
  const { data, error, isLoading } = useGeteventsQuery();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<EventArticle>();

  const filteredEvents = useMemo(() => {
    if (!data?.data) return [];

    let filtered = data.data;

    if (searchValue.trim()) {
      const searchTerm = searchValue.toLowerCase();
      filtered = filtered.filter((article) => {
        const titleMatch =
          article.title?.toLowerCase().includes(searchTerm) || false;
        const idMatch = article.id?.toString().includes(searchTerm) || false;
        const imageMatch =
          article.image?.toLowerCase().includes(searchTerm) || false;

        return titleMatch || idMatch || imageMatch;
      });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (article) => article.location === statusFilter
      );
    }

    return filtered;
  }, [data?.data, searchValue, statusFilter]);

  const handleEditClick = (article: any) => {
    setSelectedArticle(article);
    setUpdateDialogOpen(true);
  };

  const handleDeleteClick = (article: any) => {
    setSelectedArticle(article);
    setDeleteDialogOpen(true);
  };

  const handleDialogSuccess = () => {
    console.log("Operation successful - would refetch data");
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load Events. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const Events = filteredEvents;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Events
            <div className="flex gap-2">
              {searchValue && (
                <Badge variant="outline" className="text-xs">
                  Search: "{searchValue}"
                </Badge>
              )}
              {statusFilter !== "all" && (
                <Badge variant="outline" className="text-xs">
                  Status: {statusFilter}
                </Badge>
              )}
              <Badge variant="secondary">{Events.length} total</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Events.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      {searchValue || statusFilter !== "all"
                        ? "No Events match your filters"
                        : "No Events found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  Events.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <div className="relative w-16 h-12 rounded overflow-hidden bg-muted">
                          {article.image ? (
                            <Image
                              src={article.image || "/placeholder.svg"}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                              No image
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="max-w-[200px]">
                          <p className="truncate" title={article.title}>
                            {article.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ID: {article.id}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(article.location)}>
                          {article.location}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {article.date_updated ? (
                          <div className="text-sm">
                            <p>{formatDate(article.date_updated)}</p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Never
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(article)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteClick(article)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* <UpdateUpcomingeDialog
        article={selectedArticle}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        onSuccess={handleDialogSuccess}
      /> */}

      <DeleteUpcomingDialog
        //@ts-expect-error
        article={selectedArticle}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onSuccess={handleDialogSuccess}
      />
    </>
  );
}
