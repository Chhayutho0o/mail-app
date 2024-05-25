"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ArrowLeft, ArrowRight, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavProps {
  isCollapsed: boolean
  setIsCollapsed: any
}

const BottomAction = ({ isCollapsed, setIsCollapsed }: NavProps) => {
  const { theme, setTheme } = useTheme()
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn("group flex justify-end gap-4 py-2 data-[collapsed=true]:py-2",
        isCollapsed && "flex-col")}
    >
      <nav className={cn("flex gap-4 px-2 pb-3 items-center justify-center group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2",
        isCollapsed && "flex-col"
      )}>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild >
            <DropdownMenu>
              <DropdownMenuTrigger> {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</DropdownMenuTrigger>
              <DropdownMenuContent align={isCollapsed ? "end" : "start"} side={isCollapsed ? "right" : "top"}>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent side={isCollapsed ? "right" : "top"}>
            Theme
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild onClick={() => setIsCollapsed(!isCollapsed)} >
            <div className="cursor-pointer">
              {isCollapsed ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            </div>
          </TooltipTrigger>
          <TooltipContent side={isCollapsed ? "right" : "top"}>
            {isCollapsed ? "Expand" : "Hide"}
          </TooltipContent>
        </Tooltip>
      </nav>
    </div>
  )
}

export default BottomAction