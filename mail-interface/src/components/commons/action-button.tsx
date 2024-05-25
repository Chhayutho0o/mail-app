import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/commons/icons";

type ActionButtonProps = {
  href?: string;
  className?: string;
  title: string;
  name?: keyof typeof Icons;
  variant?:
  | "ghost"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
};

function ActionButton({
  href,
  className,
  name,
  title,
  variant = "default",
}: ActionButtonProps) {
  let Icon;

  if (name) {
    Icon = Icons[name];
  }

  return (
    <div className={cn(className)}>
      <Button variant={variant}>
        {href ? (
          <Link href={href} className="flex gap-1 items-center">
            {name && Icon && <Icon />}
            {title}
          </Link>

        ) : (
          <>
            {name && Icon && <Icon />}
            {title}
          </>
        )}
      </Button>
    </div>
  );
}

export default ActionButton;
