const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// アップロード先フォルダ
const uploadDir = path.join(__dirname, 'file');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// 静的ファイル提供
app.use(express.static(__dirname));

// multer 設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// アップロード処理
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

// ✅ 画像リストを返すAPI
app.get('/images', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).send('Error reading directory');
    const images = files.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
    res.json(images);
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
