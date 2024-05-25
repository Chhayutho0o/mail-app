import { Model } from "objection";

class Tag extends Model {
  static get tableName() {
    return "tags";
  }

  static get relationMappings() {
    return {
      user_tags: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + "/User",
        join: {
          from: "tags.id",
          to: "user_tags.tag_id",
        },
      },
    };
  }
}

export default Tag;
