import { Model } from "objection";

class Recipient extends Model {
  id!: number;
  is_read!: boolean;
  read_date!: string;
  status!: string;

  static get tableName() {
    return "recipients";
  }

  static get relationMappings() {
    return {
      to: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/User",
        join: {
          from: "recipients.to_id",
          to: "users.id",
        },
      },
      mail: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/Mail",
        join: {
          from: "recipients.mail_id",
          to: "mails.id",
        },
      },
    };
  }
}

export default Recipient;
