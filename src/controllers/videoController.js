import Video from "../models/Video";

// let videos = [
//   {
//     title:
//       "예준 'On The Ground' (원곡 : ROSÉ) | PLAVE FAN CONCERT 'Hello, Asterum!' ENCORE",
//     url: "N5tGU-Lt_do",
//     color: "💙",
//     rating: 5,
//     comments: 2,
//     createdAt: "52 minutes ago",
//     views: 59,
//     id: 1,
//   },
//   {
//     title:
//       "[COVER] 노아 - ベテルギウス (Betelgeuse) (원곡 : 優里 (Yuuri)) (Covered by Noah)｜#플레이브 #PLAVE",
//     url: "jDQ4-C4AHmA",
//     rating: 2,
//     comments: 5,
//     createdAt: "12 minutes ago",
//     views: 159,
//     id: 2,
//   },
//   {
//     title:
//       "[2024 PLAVE BIRTHDAY GIFT] 밤비 - Pretender (원곡 : Official髭男dism)",
//     url: "9SA6degN604",
//     rating: 4,
//     comments: 0,
//     createdAt: "4 minutes ago",
//     views: 5239,
//     id: 3,
//   },
//   {
//     title:
//       "[COVER] 은호 - FANXY CHILD (원곡 : ZICO) (Covered by Eunho)｜#플레이브 PLAVE",
//     url: "AyJMNQtmF7A",
//     rating: 2,
//     comments: 5,
//     createdAt: "12 minutes ago",
//     views: 1,
//     id: 4,
//   },
//   {
//     title:
//       "하민 'The Search' (원곡 : NF) | PLAVE FAN CONCERT 'Hello, Asterum!' ENCORE",
//     url: "3L4mzeDvFOI",
//     rating: 4,
//     comments: 0,
//     createdAt: "4 minutes ago",
//     views: 0,
//     id: 5,
//   },
// ];

function formatDate(date) {
  const now = new Date();
  const timeDiff = now - date; // 두 날짜의 차이를 밀리초 단위로 구함

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // 24시간 이내일 경우 "1초 전", "20분 전" 등의 형식으로 출력
  if (days === 0) {
    if (hours === 0) {
      if (minutes === 0) {
        if (seconds <= 1) return "1초 전";
        return `${seconds}초 전`;
      }
      return `${minutes}분 전`;
    }
    return `${hours}시간 전`;
  }

  // 24시간 이상일 경우 "2025-01-23" 형식으로 출력
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    const formattedVideos = videos.map((video) => ({
      ...video.toObject(),
      id: video._id.toString(),
      formattedCreatedAt: formatDate(video.createdAt),
    }));
    return res.render("home", { pageTitle: "Home", videos: formattedVideos });
  } catch (error) {
    return res.render("errors/server-error", {
      pageTitle: "error",
      errMsg: error.message,
    });
  }
};
export const search = async (req, res) => {
  const { keyword } = req.query;
  try {
    let videos = [];
    if (keyword) {
      videos = await Video.find({
        title: {
          $regex: new RegExp(keyword, "i"),
        },
      });
    }
    return res.render("search", {
      pageTitle: `Searching: ${keyword}`,
      keyword,
      videos,
    });
  } catch (error) {
    return res.render("errors/404", {
      pageTitle: "404 error!!",
      errMsg: error.message,
    });
  }
};
export const watch = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    if (video === null) {
      return res.render("errors/404", { pageTitle: "Video not found." });
    }
    return res.render("watch", { pageTitle: video.title, video });
  } catch (error) {
    const videos = await Video.find({});
    const formattedVideos = videos.map((video) => ({
      ...video.toObject(),
      id: video._id.toString(),
      formattedCreatedAt: formatDate(video.createdAt),
    }));
    return res.render("home", { pageTitle: "Home", videos: formattedVideos });
  }
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  let video;
  try {
    video = await Video.findById(id);
    if (!video) {
      return res.render("errors/404", { pageTitle: "video not found" });
    }
    return res.render("editVideo", { pageTitle: "Edit" + video.title, video });
  } catch (error) {
    return res.render("watch", { pageTitle: video.title, video });
  }
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, url, description, hashtags } = req.body;
  try {
    const video = await Video.exists({ _id: id });
    if (!video) {
      return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      url,
      hashtags: Video.formatHashtags(hashtags),
    });
    res.redirect(`/videos/${id}`);
  } catch (error) {
    return res.status(500).render("errors/server-error", {
      pageTitle: "error",
      errMsg: error.message,
    });
  }
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const { title, url, description, hashtags } = req.body;
  try {
    console.log("create start");
    await Video.create({
      title,
      url,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    console.log("create success");
  } catch (error) {
    return res.status(500).render("upload", {
      pageTitle: "Upload Video",
      errMsg: error._message,
    });
  }
  return res.redirect("/");
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};
