import { Model } from "objection";
import Recipient from "./Recipient";

class Mail extends Model {
  id!: number;
  is_read!: boolean;
  static get tableName() {
    return "mails";
  }

  static get softDelete() {
    return true;
  }

  static get relationMappings() {
    return {
      from: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/User",
        join: {
          from: "mails.from_id",
          to: "users.id",
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + "/Tag",
        join: {
          from: "mails.id",
          through: {
            from: "taggings.mail_id",
            to: "taggings.tag_id",
          },
          to: "tags.id",
        },
        filter(builder: any) {
          builder.orderBy("tags.level", "asc");
        },
      },
      attachments: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + "/Attachment",
        join: {
          from: "mails.id",
          to: "attachments.mail_id",
        },
      },
      recipients: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + "/Recipient",
        join: {
          from: "mails.id",
          to: "recipients.mail_id",
        },
      },
    };
  }

  static get modifiers() {
    return {
      filter: (query: any, params: any) => {
        if (params.is_read) query.where({ is_read: params.is_read });
        if (params.from_id) query.where({ from_id: params.from_id });
        if (params.read_from_date) {
          query.whereRaw(`read_date::DATE >= ${params.read_from_date}`);
        }
        if (params.read_to_date) {
          query.whereRaw(`read_date::DATE <= ${params.read_to_date}`);
        }
        if (params.create_from_date) {
          query.whereRaw(`created_at::DATE >= ${params.create_from_date}`);
        }
        if (params.create_to_date) {
          query.whereRaw(`created_at::DATE <= ${params.create_to_date}`);
        }
        if (params.status) {
          query.joinRelated();
        }
      },
    };
  }

  static list = async ({
    params,
    paging = { page: 0, perPage: 20 },
  }: {
    params?: any;
    paging: { page: number; perPage: number };
  }) => {
    return await Mail.query()
      .modify("filter", params)
      .withGraphFetched("[from, tags]")
      .orderBy("created_at", "desc")
      .page(paging.page, paging.perPage);
  };

  static userMail = async ({
    params,
    paging = { page: 0, perPage: 20 },
    currentUserId,
  }: {
    params?: any;
    paging: { page: number; perPage: number };
    currentUserId: string;
  }) => {
    let mails = (await Mail.query()
      .modify("filter", params)
      .withGraphFetched("[from, tags]")
      .joinRelated("recipients")
      .where("recipients.to_id", currentUserId)
      .andWhere("recipients.status", params.status || "none")
      .orderBy("created_at", "desc")
      .page(paging.page, paging.perPage)) as any;

    for (const mail of mails.results) {
      const recipient = await Recipient.query().findOne({
        mail_id: mail.id,
        to_id: currentUserId,
      });
      mail.recipient = recipient;
    }

    return mails;
  };
}

export default Mail;
