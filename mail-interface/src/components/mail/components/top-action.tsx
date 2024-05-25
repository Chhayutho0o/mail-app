import { format, addDays, addHours, nextSaturday } from "date-fns"
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Tag } from "@/types"
import { useMail } from "@/hooks/use-mail"

const TOP_LEFT_ACTION = [
  { title: "Archive", icon: Archive },
  { title: "Move to junk", icon: ArchiveX },
  { title: "Move to trash", icon: Trash2 },
]

const today = new Date()
const SNOOZE_TIME = [
  { title: "Later today", value: format(addHours(today, 4), "E, h:m b") },
  { title: "Tomorrow", value: format(addDays(today, 1), "E, h:m b") }, ,
  { title: "This weekend", value: format(nextSaturday(today), "E, h:m b") },
  { title: "Next week", value: format(addDays(today, 7), "E, h:m b") }
]

const TOP_RIGHT_ACTION = [
  { title: "Reply", icon: Reply },
  { title: "Reply All", icon: ReplyAll },
  { title: "Forward", icon: Forward },
]

interface Props {
  tags: Tag[]
}

const TopActions = ({ tags }: Props) => {
  const [mail] = useMail()
  return (
    <div className="flex items-center p-2">
      <div className="flex items-center gap-2">
        {TOP_LEFT_ACTION.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={false}>
                <item.icon className="h-4 w-4" />
                <span className="sr-only">{item.title}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{item.title}</TooltipContent>
          </Tooltip>
        ))}

        <Separator orientation="vertical" className="mx-1 h-6" />
        <Tooltip>
          <Popover>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={false}>
                  <Clock className="h-4 w-4" />
                  <span className="sr-only">Snooze</span>
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <PopoverContent className="flex w-[535px] p-0">
              <div className="flex flex-col gap-2 border-r px-2 py-4">
                <div className="px-4 text-sm font-medium">Snooze until</div>
                <div className="grid min-w-[250px] gap-1">
                  {SNOOZE_TIME.map((item) => (
                    <Button
                      key={item?.title}
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      {item?.title} {" "}
                      <span className="ml-auto text-muted-foreground">
                        {item?.value}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="p-2">
                <Calendar />
              </div>
            </PopoverContent>
          </Popover>
          <TooltipContent>Snooze</TooltipContent>
        </Tooltip>
      </div>
      <div className="ml-auto flex items-center gap-2">
        {TOP_RIGHT_ACTION.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={false}>
                <item.icon className="h-4 w-4" />
                <span className="sr-only">{item.title}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{item.title}</TooltipContent>
          </Tooltip>
        ))}
      </div>
      <Separator orientation="vertical" className="mx-2 h-6" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={false}>
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Mark as unread</DropdownMenuItem>
          <DropdownMenuItem>Star thread</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Tags</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <span>New Tags</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Manag Tags</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Remove Tag ({mail.selected?.tags.length})</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {tags.map((item, index) => (
                  <DropdownMenuItem key={item.id} style={{ color: item.color }} >
                    <span>{index + 1 + " " + item.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>Mute thread</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default TopActions