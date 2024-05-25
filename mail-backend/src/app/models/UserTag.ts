import { Model } from "objection";

class UserTag extends Model {
  static get tableName() {
    return "user_tags";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/User",
        join: {
          from: "user_tags.user_id",
          to: "users.id",
        },
      },
      tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/Tag",
        join: {
          from: "user_tags.tag_id",
          to: "tags.id",
        },
      },
    };
  }
}

export default UserTag;
