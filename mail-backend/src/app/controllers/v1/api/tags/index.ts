import { Request, Response } from "express";
import { pagination, paging } from "~/app/helper/utils";
import Mail from "~/app/models/Mail";
import Tag from "~/app/models/Tag";
import { mailSerializer } from "~/app/serializer/api/mail";
import User from "~/app/models/User";

export const list = async (req: Request, res: Response) => {
  try {
    const { id } = req.currentUser;
    const user = (await User.query()
      .findById(id)
      .withGraphFetched("tags")) as any;
    return res.status(200).json({ data: user.tags });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mail = await Mail.query().findById(id);
    if (!mail) {
      return res.status(404).json({ message: "Mail not found" });
    }
    await mail.$query().patch({ is_read: true });
    return res.status(200).json({ data: mailSerializer(mail) });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mail = await Mail.query().findById(id);
    if (!mail) {
      return res.status(404).json({ message: "Mail not found" });
    }
    await mail.$query().patch({ is_read: true });
    return res.status(200).json({ data: mailSerializer(mail) });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

export const destory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mail = await Mail.query().findById(id);
    if (!mail) {
      return res.status(404).json({ message: "Mail not found" });
    }
    await mail.$query().patch({ is_read: true });
    return res.status(200).json({ data: mailSerializer(mail) });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};
