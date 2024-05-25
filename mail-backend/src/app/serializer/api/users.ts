import { getImage } from "~/app/helper/image";
import { pick } from "~/app/helper/utils";

export const userSerializer = (user: any) => {
  user.profile = getImage(user.profile);
  user.cover = getImage(user.cover);
  if (user.wallet) {
    user.wallet = user.wallet.balance;
  }
  if (user.recipients)
    user.mail_status_count = mailStatusCount(user.recipients);
  return pick(user, [
    "id",
    "email",
    "profile",
    "phone",
    "first_name",
    "last_name",
    "gender",
    "created_at",
    "referral",
    "address",
    "wallet",
    "bio",
    "cover",
    "dob",
    "username",
    "mail_status_count",
  ]);
};

export const userSummarySerializer = (user: any) => {
  user.profile = getImage(user.profile);
  return pick(user, ["id", "username", "email", "profile"]);
};

export const mailStatusCount = (items: any) => {
  const statusCounts = {
    draft: 0,
    sent: 0,
    archive: 0,
    junk: 0,
    trash: 0,
  };

  for (const item of items) {
    if (item.status in statusCounts) {
      statusCounts[item.status]++;
    }
  }

  return pick(statusCounts, ["draft", "sent", "archive", "junk", "trash"]);
};
