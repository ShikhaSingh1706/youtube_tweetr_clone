import mongoose,{Schema} from "mongoose";

const subscriptionSchema=new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,
        rf: "User"
    },
    channels:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },




},      {timestampstrue})




export const Subscription=mongoose.model("Subscription", subscriptionSchema)