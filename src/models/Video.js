import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    matLength: 50,
  },
  url: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 40,
  },
  description: { type: String, required: true, trim: true, maxLength: 200 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});
videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => word.trim()) // 공백 제거
    .filter((word) => word !== "") // 빈 문자열 제거
    .map((word) => (word.startsWith("#") ? word : `#${word}`)); // # 추가
});
const Video = mongoose.model("Video", videoSchema);
export default Video;
