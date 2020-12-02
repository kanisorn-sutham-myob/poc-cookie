const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

/**
 * @param {import('cors')}
 */
app.use(
  cors({
    origin: ["http://localhost:8080", "https://poc-logout-spa.vercel.app"],
    credentials: true,
  })
);
/**
 * @param {import('express').RequestHandler}
 */
app.get("/", (req, res) => {
  res.cookie("SameSiteNotSetAndSecure", "this_is_a_cookie", {
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("SameSiteNoneAndSecure", "this_is_a_cookie", {
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("SameSiteNoneAndNotSecure", "this_is_a_cookie", {
    sameSite: "none",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("SameSiteNotSetAndNotSecure", "this_is_a_cookie", {
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    hello: "world",
  });
});

app.get("/set-new-cookie", (req, res) => {
  res.cookie("SameSiteNotSetAndNotSecure", "this_is_a_cookie", {
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  });

  res.json({
    hello: "world",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
