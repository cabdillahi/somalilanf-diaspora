"use client";

import { ArticleTable } from "@/components/dashboard/article/article-table";
import { SearchFilterArticle } from "@/components/dashboard/article/search-filter";
import { useState, useCallback } from "react";

export default function ArticlesPage() {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSearchChange = useCallback((newSearch: string) => {
    setSearchValue(newSearch);
  }, []);

  const handleStatusChange = useCallback((newStatus: string) => {
    setStatusFilter(newStatus);
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Article Management
        </h1>
        <p className="text-muted-foreground">
          Manage your articles with search and filtering capabilities
        </p>
      </div>

      <SearchFilterArticle
        onSearchChange={handleSearchChange}
        onStatusFilter={handleStatusChange}
        searchValue={searchValue}
        statusFilter={statusFilter}
      />

      <ArticleTable searchValue={searchValue} statusFilter={statusFilter} />
    </div>
  );
}
