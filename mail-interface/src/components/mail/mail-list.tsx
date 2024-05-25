"use client"
import { useState, useTransition } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Email, EmailMeta, SearchParams, Tag } from "@/types"
import { useMail } from "@/hooks/use-mail"
import InfiniteScroll from "@/components/ui/infinite-scroll"
import { Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import MailCard from "@/components/commons/mail-card"
import { fetchEmails } from "@/actions/emails"

interface Props {
  data: EmailMeta
  searchParams: SearchParams
  title: string
}

export function MailList({ data, searchParams, title }: Props) {
  const [items, setItems] = useState(data?.data)
  const [meta, setMeta] = useState(data?.meta)
  const [mail, setMail] = useMail()
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, startTransition] = useTransition()

  const onLoadMore = async () => {
    startTransition(async () => {
      const { data: result, meta: newMeta } = await fetchEmails({ page: meta && meta?.next })
      setItems((prev) => [...prev, ...result])
      setMeta(newMeta)
      if (newMeta?.next === newMeta?.totalPage) {
        setHasMore(false)
      }
    })
  }
  const handleSelect = (item: Email) => {
    setMail({ ...mail, selected: item })
    setItems((prev) => prev.map((mail) => mail.id === item.id ? { ...mail, recipient: { ...mail.recipient, is_read: true } } : mail))
  }
  return (
    <ScrollArea className="h-screen">
      <div className="hover-animation even z-10 bg-main-background/60 px-4 py-2 backdrop-blur-md sticky top-0">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <Separator />
      <div className="flex flex-col gap-2 py-2 px-4 pt-2">
        {items && items.map((item) => (
          <MailCard key={item.id} item={item} onSelect={handleSelect} selectedMail={mail} />
        ))}
        <InfiniteScroll hasMore={hasMore} isLoading={isLoading} next={onLoadMore} threshold={1}>
          {hasMore && <Loader2 className=" my-4 h-8 w-8 animate-spin mx-auto" />}
        </InfiniteScroll>
      </div>
    </ScrollArea >
  )
}
