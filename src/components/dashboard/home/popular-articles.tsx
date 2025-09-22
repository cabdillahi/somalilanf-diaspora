import { Heart, MessageCircle, MoreHorizontal, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const articles = [
  {
    id: 1,
    title: "Beautiful city with friends",
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32&text=JD",
    },
    date: "15th Nov, 2020",
    likes: 125,
    comments: 68,
    views: 1250,
  },
  {
    id: 2,
    title: "Drawing a sketch",
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32&text=JS",
    },
    date: "12th Nov, 2020",
    likes: 102,
    comments: 45,
    views: 890,
  },
  {
    id: 3,
    title: "Riding bike on road",
    author: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32&text=MJ",
    },
    date: "28th Oct, 2020",
    likes: 89,
    comments: 32,
    views: 654,
  },
  {
    id: 4,
    title: "Project discussion with team",
    author: {
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=32&width=32&text=SW",
    },
    date: "15th Oct, 2020",
    likes: 92,
    comments: 22,
    views: 543,
  },
]

export function PopularArticles() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Popular Articles</CardTitle>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Articles</TableHead>
              <TableHead className="text-center">Likes</TableHead>
              <TableHead className="text-center">Comments</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                      <AvatarFallback>
                        {article.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{article.title}</div>
                      <div className="text-xs text-muted-foreground">{article.date}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Heart className="h-3 w-3 text-red-500" />
                    <span className="text-sm">{article.likes}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <MessageCircle className="h-3 w-3 text-blue-500" />
                    <span className="text-sm">{article.comments}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
