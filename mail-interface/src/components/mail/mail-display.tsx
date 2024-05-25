"use client"
import { useMail } from "@/hooks/use-mail"
import { useEffect } from "react"
import MailForm from "@/components/mail/components/mail-form"
import TopActions from "@/components/mail/components/top-action"
import { Separator } from "@/components/ui/separator"
import { fetchEmail } from "@/actions/emails"
import { Tag } from "@/types"

interface Props {
  tags: Tag[]
}

export function MailDisplay({ tags }: Props) {
  const [mail] = useMail()


  useEffect(() => {
    const fetchMail = async () => {
      if (mail.selected) {
        await fetchEmail(mail.selected.id)
      }
    }
    fetchMail()
  }, [mail])
  return (
    <div className="flex h-full flex-col">
      <TopActions tags={tags} />
      <Separator />
      {mail.selected ? (
        <MailForm data={mail.selected} />
      ) : (
        <div className="p-16 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  )
}