"use client"
import { cn } from "@/lib/utils"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { NAV_ITEMS, RESIZABLE_VALUE } from "@/constants"
import { NavItem } from "@/types"
import { Nav } from "@/components/menu/nav"
import { accounts } from "@/dummy-data/account"
import { AccountSwitcher } from "@/components/menu/account-switcher"
import BottomAction from "@/components/menu/bottom-action"
import { useState } from "react"

interface Props {
  children: React.ReactNode,
  defaultLayout: number[]
  defaultCollapsed: boolean
}

export function Container({
  children,
  defaultCollapsed,
  defaultLayout = RESIZABLE_VALUE.defaultLayout
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full items-stretch"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
        }}
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={4}
          collapsible={true}
          minSize={15}
          maxSize={16}
          onResize={(values) => {
            const isTrue = values <= 4 ? true : false
            setIsCollapsed(isTrue)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              isTrue
            )}`
          }}
          className={cn(
            isCollapsed &&
            "transition-all duration-300 ease-in-out"
          )}
        >
          <div className="flex flex-col h-screen justify-between">
            <div>
              <div
                className={cn(
                  "flex h-[52px] items-center justify-center",
                  isCollapsed ? "h-[52px]" : "px-2"
                )}
              >
                <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
              </div>
              <Separator />
              <Nav
                isCollapsed={isCollapsed}
                links={NAV_ITEMS.section1 as NavItem[]}
              />
              <Separator />
              <Nav
                isCollapsed={isCollapsed}
                links={NAV_ITEMS.section2 as NavItem[]}
              />
            </div>
            <BottomAction isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          </div>

        </ResizablePanel>
        <ResizableHandle withHandle />
        {children}
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}