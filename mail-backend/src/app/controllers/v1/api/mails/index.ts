import dayjs from "dayjs";
import { Request, Response } from "express";
import { pagination, paging } from "~/app/helper/utils";
import Mail from "~/app/models/Mail";
import Recipient from "~/app/models/Recipient";
import { mailSerializer } from "~/app/serializer/api/mail";

export const list = async (req: Request, res: Response) => {
  try {
    const { currentUser } = req;
    const { query } = req;
    const page = paging(req);
    const mails = await Mail.userMail({
      params: query,
      paging: page,
      currentUserId: currentUser.id,
    });
    const meta = pagination(mails.total, page.perPage, page.page);
    return res
      .status(200)
      .json({ data: mails?.results?.map(mailSerializer), meta });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

export const detail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { currentUser } = req;
    const mail = await Mail.query().findById(id);
    if (!mail) return res.status(404).json({ message: "Mail not found" });
    await Recipient.query()
      .findOne({
        mail_id: id,
        to_id: currentUser.id,
      })
      .patch({ is_read: true, read_date: dayjs().format() });
    return res.status(200).json({ data: mailSerializer(mail) });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

export const destory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { currentUser } = req;
    const mail = await Mail.query()
      .deleteById(id)
      .where({ sender_id: currentUser.id });

    if (!mail) {
      return res.status(404).json({ message: "Mail not found" });
    }
    return res.status(200).json({ message: "Record delete sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

export const moveTo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { currentUser } = req;
    const mail = await Mail.query()
      .deleteById(id)
      .where({ sender_id: currentUser.id });

    if (!mail) {
      return res.status(404).json({ message: "Mail not found" });
    }

    await Recipient.query()
      .findOne({
        mail_id: id,
        user_id: currentUser.id,
      })
      .patch({ status });

    return res
      .status(200)
      .json({ message: `Record move to ${status} sucessfully` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};
