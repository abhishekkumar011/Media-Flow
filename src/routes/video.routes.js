import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  deleteVideo,
  publishAVideo,
  updateVideo,
} from "../controllers/video.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);

router
  .route("/v/:videoId")
  .patch(upload.single("thumbnail"), updateVideo)
  .delete(deleteVideo);

export default router;
