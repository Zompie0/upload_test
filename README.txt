# 画像アップロード（テスト版）
## 構成
- index.html : フロントエンド（ドラッグ＆ドロップ対応）
- server.js : Node.js + Express + multer 実装
- upload.php : PHP 実装
- file/ : アップロード保存用フォルダ（手動で作成）

## Node.js 実行方法
1. npm init -y
2. npm install express multer
3. node server.js
4. ブラウザで http://localhost:3000 にアクセス

## PHP 実行方法
1. 同じディレクトリに置いてサーバを起動
2. fetch先を upload.php に変更
