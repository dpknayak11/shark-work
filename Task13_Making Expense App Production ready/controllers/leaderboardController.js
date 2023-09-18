const path = require("path");
exports.getLeaderboardPage = async (req, res, next) => {
    try {
      res.sendFile( path.join(__dirname, "../", "views", "leaderboard-page.html"));
    } catch { (err) => console.log(err); }
  };