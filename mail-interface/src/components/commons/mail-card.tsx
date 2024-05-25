import { cn, formatDate } from '@/lib/utils'
import { Email } from '@/types'
import { minBy } from "lodash"
interface Props {
  item: Email,
  onSelect: (_: Email) => void
  selectedMail: any
}

const MailCard = ({ item, onSelect, selectedMail }: Props) => {
  const highestLevelTag = minBy(item?.tags, "level")
  return (
    <button
      key={item?.id}
      className={cn(
        "flex flex-col item?s-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
        selectedMail?.selected?.id === item?.id && "bg-muted"
      )}
      onClick={() => onSelect(item)}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex item?s-center">
          <div className="flex item?s-center gap-2">
            <div className={cn("font-semibold", item?.recipient.is_read && "text-muted-foreground")}>{item?.from.username}</div>
            {!item?.recipient.is_read && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
          <div
            className={cn(
              "ml-auto text-xs",
              item?.recipient.is_read && "text-muted-foreground ",
            )}
          >
            {formatDate(item?.created_at, "simple")}
          </div>
        </div>
        <div
          style={highestLevelTag && { color: highestLevelTag.color }}
          className={cn("text-xs font-medium",
            item?.recipient.is_read && "text-muted-foreground",
          )}>{item?.subject}</div>
      </div>
    </button>
  )
}

export default MailCard