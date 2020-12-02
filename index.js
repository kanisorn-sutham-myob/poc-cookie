const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

/**
 * @param {import('cors')}
 */
app.use(
  cors({
    origin: ["http://localhost:8080", "https://poc-logout-spa.vercel.app/"],
    credentials: true,
  })
);
/**
 * @param {import('express').RequestHandler}
 */
app.get("/", (req, res) => {
  res.cookie("SameSiteNotSetAndSecure", "this is a cookie", {
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("SameSiteNoneAndSecure", "this is a cookie", {
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("SameSiteNoneAndNotSecure", "this is a cookie", {
    sameSite: "none",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("SameSiteNotSetAndNotSecure", "this is a cookie", {
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    hello: "world",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
