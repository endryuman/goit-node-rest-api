import { model, Schema, Types } from "mongoose";
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false }
);

export const Contact = model("Contact", contactSchema);
