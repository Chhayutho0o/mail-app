import {
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable"
import { EmailMeta, SearchParams } from "@/types"
import { MailList } from "@/components/mail/mail-list"
import { MailDisplay } from "@/components/mail/mail-display"
import { fetchTags } from "@/actions/tags"
import { RESIZABLE_VALUE } from "@/constants"
interface Props {
  searchParams: SearchParams
  defaultLayout?: number[] | undefined
  data: EmailMeta
  title: string
}

const Mail = async ({
  defaultLayout = RESIZABLE_VALUE.defaultLayout,
  searchParams,
  data,
  title
}: Props) => {
  const { data: tags } = await fetchTags()
  return (
    <>
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <MailList data={data} searchParams={searchParams} title={title} />
      </ResizablePanel >
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[2]}>
        <MailDisplay tags={tags} />
      </ResizablePanel>
    </>

  )
}

export default Mail