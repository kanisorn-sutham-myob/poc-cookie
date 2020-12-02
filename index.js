const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:8080", "https://poc-logout-spa.vercel.app"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Success");
});

const defaultCookieConfig = {
  maxAge: 24 * 60 * 60 * 1000,
};

app.get("/refresh", (req, res) => {
  // setup default cookies
  res.cookie("C1__SameSiteNotSet_And_Secure", "__value__", {
    secure: true,
    ...defaultCookieConfig,
  });
  res.cookie("C2__SameSiteNone_And_Secure", "__value__", {
    sameSite: "none",
    secure: true,
    ...defaultCookieConfig,
  });
  res.cookie("C3__SameSiteNone_And_NoSecure", "__value__", {
    sameSite: "none",
    secure: false,
    ...defaultCookieConfig,
  });
  res.cookie("C4__SameSiteNotSet_And_NoSecure", "__value__", {
    ...defaultCookieConfig,
  });

  res.send("Success");
});

app.get("/set-new-cookie", (req, res) => {
  // change only SameSiteNotSetAndNotSecure to have sameSite and secure
  res.cookie("C4__SameSiteNotSet_And_NoSecure", "__value__", {
    sameSite: "none",
    secure: true,
    ...defaultCookieConfig,
  });

  res.send("Success");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
