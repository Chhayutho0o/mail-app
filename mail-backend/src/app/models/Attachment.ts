import { Model } from "objection";

class Attachment extends Model {
  static get tableName() {
    return "attachements";
  }
}

export default Attachment;
