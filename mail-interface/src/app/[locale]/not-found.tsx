import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/commons/empty-placeholder";

export default function NotFound() {
  return (
    <EmptyPlaceholder className="mx-auto max-w-[800px] mt-10">
      <EmptyPlaceholder.Icon name="warning" />
      <EmptyPlaceholder.Title>Uh oh! Not Found</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Oops! It seems like you&apos;ve taken a wrong turn. The page you&apos;re
        looking for could not be found.
      </EmptyPlaceholder.Description>
      <Link href="/" className={buttonVariants({ variant: "ghost" })}>
        Go to Dashboard
      </Link>
    </EmptyPlaceholder>
  );
}
