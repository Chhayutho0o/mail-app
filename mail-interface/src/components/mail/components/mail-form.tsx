import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Email } from "@/types"
import { format } from "date-fns"
import Badge from "@/components/commons/badge"
import useSession from "@/components/session/useSession"

interface Props {
  data: Email
}

const MailForm = ({ data }: Props) => {
  const { session } = useSession()
  console.log(session)
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-start p-4">
        <div className="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarImage alt={data.from.username} />
            <AvatarFallback>
              {data.from.username
                .split(" ")
                .map((chunk: any) => chunk[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="font-semibold">
              {data.from.username}
            </div>
            <div className="line-clamp-1 text-xs">
              {session?.username}
            </div>
          </div>
        </div>
        {data?.created_at && (
          <div className="ml-auto text-xs text-muted-foreground">
            {format(new Date(data?.created_at), "PPpp")}
          </div>
        )}
      </div>
      <Separator />
      <div className="py-2 px-4 flex flex-col gap-1">
        <div className="line-clamp-1 text-base font-semibold">{data?.subject}</div>
        {data.tags.length ? (
          <div className="flex items-center gap-2">
            {data.tags.map((tag) => (
              <Badge key={tag.id} name={tag.name} color={tag.color} />
            ))}
          </div>
        ) : null}
      </div>
      <Separator />
      <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
        {data?.body}
      </div>
    </div>
  );
};

export default MailForm;
