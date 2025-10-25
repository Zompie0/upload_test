<?php
$uploadDir = __DIR__ . DIRECTORY_SEPARATOR . 'file' . DIRECTORY_SEPARATOR;
if(!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(!isset($_FILES['image'])){
        http_response_code(400);
        echo 'ファイルがアップロードされていません';
        exit;
    }
    $f = $_FILES['image'];
    if($f['error'] !== UPLOAD_ERR_OK){
        http_response_code(400);
        echo 'アップロードエラー: ' . $f['error'];
        exit;
    }
    $name = basename($f['name']);
    $name = preg_replace('/[^a-zA-Z0-9._-]/', '_', $name);
    $target = $uploadDir . time() . '_' . $name;
    if(move_uploaded_file($f['tmp_name'], $target)){
        echo 'saved: ' . 'file/' . basename($target);
    } else {
        http_response_code(500);
        echo '保存に失敗しました';
    }
} else {
    echo 'このスクリプトは POST で呼んでください';
}