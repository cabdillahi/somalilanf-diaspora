"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteeventMutation } from "@/services/event/event-api";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface Article {
  id: number;
  Title: string;
}

interface DeleteArticleDialogProps {
  article: Article | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteUpcomingDialog({
  article,
  open,
  onOpenChange,
  onSuccess,
}: DeleteArticleDialogProps) {
  const [deleteArticle, { isLoading }] = useDeleteeventMutation();

  const handleDelete = async () => {
    if (!article) return;

    try {
      await deleteArticle(article.id.toString()).unwrap();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to delete article");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Delete upcoming
          </DialogTitle>
          <DialogDescription>
            {`Are you sure you want to delete "${article?.Title}"? This action cannot be undone.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
