const express = require('express');
const app = express();
const port = 1834;
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { format } = require('date-fns');

// 使用 multer 中间件处理 multipart/form-data 格式的请求
const upload = multer();
app.use(upload.none());

app.post('/saveUrls', (req, res) => {
    const { type, inputurl } = req.body;

    if (!type || !inputurl) {
        return res.status(400).send('类型和 URL 不能为空');
    }

    try {
        // 创建类型文件夹路径
        const typeDir = path.join(__dirname, 'data', type);
        // 检查类型文件夹是否存在，不存在则创建
        if (!fs.existsSync(typeDir)) {
            fs.mkdirSync(typeDir, { recursive: true });
        }
        
        // 获取当前日期（年月日格式）
        const currentDate = format(new Date(), 'yyyyMMdd');
        const fileName = `${currentDate}_videoUrls.txt`;
        
        // 完整的文件路径：类型文件夹/日期文件
        const filePath = path.join(typeDir, fileName);

        // 追加内容到文件
        fs.appendFileSync(filePath, inputurl + '\n', { flag: 'a' });
        
        res.status(200).send(`数据已成功追加到 ${type}/${fileName}`);
    } catch (error) {
        console.error('保存文件时出错:', error);
        res.status(500).send('保存文件时出错');
    }
});

app.listen(port, () => {
    console.log(`服务器正在运行，监听端口 ${port}`);
});