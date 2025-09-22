import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"

// Define the structure for group data
interface Group {
  id: number
  name: string
  category: string
  dateCreated: string
  status: "Complete" | "Pending" | "Deny"
  members: Array<{
    name: string
    avatar: string
  }>
  logo: string
  logoColor: string
}

// Sample data matching the dashboard design
const groupsData: Group[] = [
  {
    id: 1,
    name: "Tech Innovators",
    category: "Technology",
    dateCreated: "15 Oct 2019",
    status: "Complete",
    members: [
      { name: "John Doe", avatar: "/diverse-person-portrait.png" },
      { name: "Jane Smith", avatar: "/diverse-group-conversation.png" },
    ],
    logo: "🚀",
    logoColor: "bg-blue-500",
  },
  {
    id: 2,
    name: "Tech Innovators",
    category: "Technology",
    dateCreated: "22 Oct 2019",
    status: "Pending",
    members: [{ name: "Mike Johnson", avatar: "/diverse-group-meeting.png" }],
    logo: "⚡",
    logoColor: "bg-cyan-500",
  },
  {
    id: 3,
    name: "Tech Innovators",
    category: "Technology",
    dateCreated: "13 Oct 2019",
    status: "Deny",
    members: [
      { name: "Sarah Wilson", avatar: "/diverse-group-meeting.png" },
      { name: "Tom Brown", avatar: "/diverse-group-five.png" },
      { name: "Lisa Davis", avatar: "/diverse-group-meeting.png" },
    ],
    logo: "💡",
    logoColor: "bg-purple-500",
  },
  {
    id: 4,
    name: "Tech Innovators",
    category: "Technology",
    dateCreated: "14 Oct 2019",
    status: "Complete",
    members: [
      { name: "Alex Chen", avatar: "/diverse-group-meeting.png" },
      { name: "Emma Wilson", avatar: "/diverse-group-meeting.png" },
    ],
    logo: "🎯",
    logoColor: "bg-pink-500",
  },
  {
    id: 5,
    name: "Tech Innovators",
    category: "Technology",
    dateCreated: "13 Oct 2019",
    status: "Complete",
    members: [
      { name: "David Lee", avatar: "/diverse-group-conversation.png" },
      { name: "Sophie Taylor", avatar: "/diverse-group-meeting.png" },
    ],
    logo: "🔥",
    logoColor: "bg-indigo-500",
  },
  {
    id: 6,
    name: "Tech Innovators",
    category: "Technology",
    dateCreated: "24 Oct 2019",
    status: "Pending",
    members: [{ name: "Kevin Zhang", avatar: "/diverse-group-eleven.png" }],
    logo: "⚙️",
    logoColor: "bg-green-500",
  },
  {
    id: 7,
    name: "Tech Innovators",
    category: "Technology",
    dateCreated: "15 Oct 2019",
    status: "Deny",
    members: [{ name: "Rachel Green", avatar: "/diverse-group-meeting.png" }],
    logo: "🌟",
    logoColor: "bg-teal-500",
  },
  {
    id: 8,
    name: "Tech Innovators",
    category: "Technology",
    dateCreated: "14 Oct 2019",
    status: "Complete",
    members: [
      { name: "Mark Johnson", avatar: "/diverse-group-meeting.png" },
      { name: "Anna Smith", avatar: "/diverse-group-friends.png" },
    ],
    logo: "🎨",
    logoColor: "bg-orange-500",
  },
  {
    id: 9,
    name: "Brand logo design",
    category: "Technology",
    dateCreated: "22 Oct 2019",
    status: "Pending",
    members: [{ name: "Chris Wilson", avatar: "/person15.jpg" }],
    logo: "🎭",
    logoColor: "bg-cyan-500",
  },
]

// Helper function to get status badge styling
function getStatusBadge(status: Group["status"]) {
  const styles = {
    Complete: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    Pending: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    Deny: "bg-red-100 text-red-800 hover:bg-red-100",
  }

  return (
    <Badge variant="secondary" className={styles[status]}>
      {status}
    </Badge>
  )
}

export function GroupsTable() {
  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardContent className="p-0">
        {/* Table container with horizontal scroll on mobile */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table header with proper styling */}
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group's
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table body with group data */}
            <tbody className="bg-white divide-y divide-gray-200">
              {groupsData.map((group) => (
                <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                  {/* Group logo with colorful background */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`w-10 h-10 rounded-lg ${group.logoColor} flex items-center justify-center text-white text-lg`}
                    >
                      {group.logo}
                    </div>
                  </td>

                  {/* Group name and category */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{group.name}</div>
                      <div className="text-sm text-gray-500">{group.category}</div>
                    </div>
                  </td>

                  {/* Creation date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{group.dateCreated}</td>

                  {/* Status badge */}
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(group.status)}</td>

                  {/* Member avatars with overlap effect */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="w-8 h-8 border-2 border-white">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {group.members.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                          +{group.members.length - 3}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Action menu button */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">Showing 1 to 9 of 130 results</div>

            {/* Pagination buttons */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm" className="bg-green-600 text-white hover:bg-green-700">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                4
              </Button>
              <Button variant="outline" size="sm">
                5
              </Button>

              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
