const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // JSON パース用に追加

// DB接続プール
const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'testuser',
  password: 'testpass',
  database: 'testdb01',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000
});


// 🚀 これを追加（public を静的配信）- APIルートより後に配置
app.use(express.static('public'));
app.use('/public', express.static('public'));
app.use('/image', express.static('image'));

// サーバー起動
app.listen(3002, '0.0.0.0', () => {
  console.log('Server running on port 3002');
});