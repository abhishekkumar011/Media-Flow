import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  removeVideoFromPlaylist,
  updatePlaylist,
} from "../controllers/playlist.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(createPlaylist);
router.route("/:playlistId").patch(updatePlaylist).delete(deletePlaylist);
router.route("/add/:playlistId/:videoId").patch(addVideoToPlaylist);
router.route("/remove/:playlistId/:videoId").patch(removeVideoFromPlaylist);

export default router;
