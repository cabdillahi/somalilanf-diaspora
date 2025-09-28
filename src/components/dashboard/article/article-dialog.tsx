"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateArticleMutation } from "@/services/article/aritcle-api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface ArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ArticleFormData {
  Title: string;
  content: string;
  featured_image_url: string;
}

export function ArticleDialog({ open, onOpenChange }: ArticleDialogProps) {
  const [formData, setFormData] = useState<ArticleFormData>({
    Title: "",
    content: "",
    featured_image_url: "",
  });

  const [preview, setPreview] = useState<string | null>(null);

  const [createArticle, { isLoading }] = useCreateArticleMutation();

  // handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        featured_image_url: base64String,
      }));
      setPreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createArticle(formData).unwrap();
      toast.success("Article successfully created ");
      onOpenChange(false);
      resetForm();
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { errors?: { message?: string }[] };
      };

      const errorMessage =
        error?.data?.errors?.[0]?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      Title: "",
      content: "",
      featured_image_url: "",
    });
    setPreview(null);
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Article</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Article Title */}
          <div className="space-y-2">
            <Label htmlFor="Title">Title</Label>
            <Input
              id="Title"
              placeholder="Enter Article Title"
              value={formData.Title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, Title: e.target.value }))
              }
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your article content..."
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={6}
              required
            />
          </div>

          {/* Upload Image */}
          <div className="space-y-2">
            <Label htmlFor="image">Featured Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="flex-1"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
