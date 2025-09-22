"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { ArticleDialog } from "./article-dialog";

interface SearchFilterArticleProps {
  onSearchChange?: (search: string) => void;
  onStatusFilter?: (status: string) => void;
  searchValue?: string;
  statusFilter?: string;
}

export function SearchFilterArticle({
  onSearchChange,
  onStatusFilter,
  searchValue = "",
  statusFilter = "all",
}: SearchFilterArticleProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm w-full border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Articles
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by title or ID..."
              className="pl-10"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <Select
            value={statusFilter}
            onValueChange={(value) => onStatusFilter?.(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action buttons */}
        <ArticleDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

        <div className="flex gap-2">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white"
          >
            create article
          </Button>
        </div>
      </div>
    </div>
  );
}
