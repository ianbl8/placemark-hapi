import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  placename: String,
  latitude: Number,
  longitude: Number,
  description: String,
  img: String,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  categorytitle: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Place = Mongoose.model("Place", placeSchema);