import { fetchEmails } from "@/actions/emails";
import { SearchParams } from "@/types";
import Mail from "@/components/mail";

interface Props {
  searchParams: SearchParams
}
const InboxPage = async ({ searchParams }: Props) => {
  const emails = await fetchEmails(searchParams)
  return <Mail searchParams={searchParams} data={emails} title="Drafts" />;
}

export default InboxPage
