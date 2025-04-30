let videos = [
  {
    title:
      "예준 'On The Ground' (원곡 : ROSÉ) | PLAVE FAN CONCERT 'Hello, Asterum!' ENCORE",
    url: "N5tGU-Lt_do",
    color: "💙",
    rating: 5,
    comments: 2,
    createdAt: "52 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title:
      "[COVER] 노아 - ベテルギウス (Betelgeuse) (원곡 : 優里 (Yuuri)) (Covered by Noah)｜#플레이브 #PLAVE",
    url: "jDQ4-C4AHmA",
    rating: 2,
    comments: 5,
    createdAt: "12 minutes ago",
    views: 159,
    id: 2,
  },
  {
    title:
      "[2024 PLAVE BIRTHDAY GIFT] 밤비 - Pretender (원곡 : Official髭男dism)",
    url: "9SA6degN604",
    rating: 4,
    comments: 0,
    createdAt: "4 minutes ago",
    views: 5239,
    id: 3,
  },
  {
    title:
      "[COVER] 은호 - FANXY CHILD (원곡 : ZICO) (Covered by Eunho)｜#플레이브 PLAVE",
    url: "AyJMNQtmF7A",
    rating: 2,
    comments: 5,
    createdAt: "12 minutes ago",
    views: 1,
    id: 4,
  },
  {
    title:
      "하민 'The Search' (원곡 : NF) | PLAVE FAN CONCERT 'Hello, Asterum!' ENCORE",
    url: "3L4mzeDvFOI",
    rating: 4,
    comments: 0,
    createdAt: "4 minutes ago",
    views: 0,
    id: 5,
  },
];

export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render("editVideo", { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const video = videos[id - 1];
  video.title = title;
  res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = (req, res) => {
  const { title, url } = req.body;
  const newVideo = {
    title,
    url,
    rating: 0,
    comments: 0,
    createdAt: "just uploaded",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
