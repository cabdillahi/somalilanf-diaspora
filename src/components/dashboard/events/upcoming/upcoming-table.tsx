"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  AlertCircle,
  Edit,
  MapPin,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { DeleteUpcomingDialog } from "./delete-upcoming";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "delay":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
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

interface EventArticle {
  id: number;
  title: string;
  location: string;
  date_updated?: string;
  image?: string | null;
}

interface UpcomingTableProps {
  searchValue?: string;
  statusFilter?: string;
}

export function UpcomingTable({
  searchValue = "",
  statusFilter = "all",
}: UpcomingTableProps) {
  const { data, error, isLoading } = useGeteventsQuery();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventArticle | null>(null);
  const [localSearch, setLocalSearch] = useState(searchValue);
  const [localStatusFilter, setLocalStatusFilter] = useState(statusFilter);
  console.log(setLocalStatusFilter, setLocalSearch);
  const filteredEvents = useMemo(() => {
    if (!data?.data) return [];

    let filtered = data.data;

    const searchTerm = (localSearch || searchValue).toLowerCase();
    if (searchTerm.trim()) {
      filtered = filtered.filter((event) => {
        const titleMatch =
          event.title?.toLowerCase().includes(searchTerm) || false;
        const idMatch = event.id?.toString().includes(searchTerm) || false;
        const locationMatch =
          event.location?.toLowerCase().includes(searchTerm) || false;

        return titleMatch || idMatch || locationMatch;
      });
    }

    const currentFilter = localStatusFilter || statusFilter;
    if (currentFilter !== "all") {
      filtered = filtered.filter((event) => event.location === currentFilter);
    }

    return filtered;
  }, [data?.data, searchValue, statusFilter, localSearch, localStatusFilter]);

  const handleEditClick = (event: EventArticle) => {
    setSelectedEvent(event);
    console.log("Edit event:", event);
  };

  const handleDeleteClick = (event: EventArticle) => {
    setSelectedEvent(event);
    setDeleteDialogOpen(true);
  };

  const handleDialogSuccess = () => {
    console.log("Operation successful - would refetch data");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[100px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-12 w-16 rounded" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
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
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load events. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const events = filteredEvents;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Events
            <div className="flex gap-2">
              {localSearch && (
                <Badge variant="outline" className="text-xs">
                  Search: &quot;{localSearch}&quot;
                </Badge>
              )}
              {localStatusFilter !== "all" && (
                <Badge variant="outline" className="text-xs">
                  Location: &quot;{localStatusFilter}&quot;
                </Badge>
              )}
              <Badge variant="secondary">{events.length} total</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[60px]">#</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      {localSearch || localStatusFilter !== "all"
                        ? "No events match your filters"
                        : "No events found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((event, index) => (
                    <TableRow key={event.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {index + 1}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                            {event.image ? (
                              <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                <MapPin className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p
                              className="font-medium text-sm truncate"
                              title={event.title}
                            >
                              {event.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Event ID: {event.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {event.date_updated ? (
                          <div className="text-sm">
                            <p>{formatDate(event.date_updated)}</p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Not set
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(
                            event.location
                          )} text-xs px-2 py-1`}
                          variant="secondary"
                        >
                          {event.location}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {event.location}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditClick(event)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(event)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
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

      <DeleteUpcomingDialog
        article={selectedEvent}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onSuccess={handleDialogSuccess}
      />
    </div>
  );
}
