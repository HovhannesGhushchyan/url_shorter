import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import path from 'path';
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let database = {};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));  // Serve static files from React build

app.post("/api/shorten", (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== "string" || !/^https?:\/\/.+$/.test(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const slug = nanoid(6);
  database[slug] = url;
  res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${slug}` });
});

app.get("/:slug", (req, res) => {
  const originalUrl = database[req.params.slug];
  if (originalUrl) {
    return res.redirect(originalUrl);
  }
  res.status(404).send("<h1>404 Not Found</h1>");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});