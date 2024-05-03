import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Subscription } from "../models/subscription.model.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!channelId) {
    throw new ApiError(400, "channelId is required");
  }

  const isSubscribed = await Subscription.findOne({
    subscriber: req.user?._id,
    channel: channelId,
  });

  if (isSubscribed) {
    await Subscription.findByIdAndDelete(isSubscribed?._id);

    return res
      .status(200)
      .json(
        new ApiResponse(200, { subscribed: false }, "unsunscribed successfully")
      );
  }

  const subscribed = await Subscription.create({
    subscriber: req.user?._id,
    channel: channelId,
  });

  if (!subscribed) {
    throw new ApiError(500, "Subscription failed");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { subscribed: true }, "Subscription successfully")
    );
});

export { toggleSubscription };
