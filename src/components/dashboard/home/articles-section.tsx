import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, MoreHorizontal, ThumbsUp } from "lucide-react";

const articlesData = [
  {
    id: 1,
    title: "Beautiful Day with Friends",
    date: "10 Nov 2020",
    author: {
      name: "Sarah Johnson",
      avatar: "/diverse-woman-portrait.png",
    },
    likes: 125,
    comments: 68,
    image: "/diverse-group-friends.png",
  },
  {
    id: 2,
    title: "Drawing a sketch",
    date: "02 Nov 2020",
    author: {
      name: "Mike Chen",
      avatar: "/man.jpg",
    },
    likes: 102,
    comments: 48,
    image: "/simple-pencil-sketch.png",
  },
  {
    id: 3,
    title: "Riding bike on road",
    date: "24 Oct 2020",
    author: {
      name: "Alex Rivera",
      avatar: "/diverse-group.png",
    },
    likes: 88,
    comments: 35,
    image: "/classic-bicycle.png",
  },
  {
    id: 4,
    title: "Project discussion with team",
    date: "15 Oct 2020",
    author: {
      name: "Emma Wilson",
      avatar: "/professional-woman.png",
    },
    likes: 62,
    comments: 22,
    image: "/team-meeting.jpg",
  },
];

export function ArticlesSection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Popular Articles
        </CardTitle>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
            <div className="col-span-6">Articles</div>
            <div className="col-span-2 text-center">Likes</div>
            <div className="col-span-2 text-center">Comments</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-3">
            {articlesData.map((article) => (
              <div
                key={article.id}
                className="md:grid md:grid-cols-12 gap-4 items-center py-2 hover:bg-muted/50 rounded-lg"
              >
                {/* Mobile Layout */}
                <div className="md:hidden space-y-3 p-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 space-y-1">
                      <div className="font-medium text-sm">{article.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {article.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{article.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{article.comments}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:contents">
                  {/* Article Info */}
                  <div className="col-span-6 flex items-center space-x-3">
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{article.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {article.date}
                      </div>
                    </div>
                  </div>

                  {/* Likes */}
                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <ThumbsUp className="h-4 w-4 text-red-500" />
                      <span className="text-sm">{article.likes}</span>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{article.comments}</span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="col-span-2 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
