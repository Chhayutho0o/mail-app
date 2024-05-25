import { Model } from "objection";

class Tagging extends Model {
  static get tableName() {
    return "taggings";
  }
}

export default Tagging;
