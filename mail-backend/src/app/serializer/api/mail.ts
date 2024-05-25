import { pick } from "lodash";
import { userSummarySerializer } from "./users";

export const mailSerializer = (data: any) => {
  if (data.from) data.from = userSummarySerializer(data.from);
  if (data.recipient) data.recipient = recipientSerializer(data.recipient);
  return pick(data, [
    "id",
    "subject",
    "body",
    "level",
    "created_at",
    "from",
    "recipient",
    "tags",
  ]);
};

export const recipientSerializer = (data: any) => {
  return pick(data, [
    "id",
    "to_id",
    "status",
    "is_read",
    "read_date",
    "created_at",
  ]);
};
