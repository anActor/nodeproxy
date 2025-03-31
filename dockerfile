FROM node:18-alpine

WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制应用代码
COPY . .

# 创建目录来存储生成的文件
RUN mkdir -p /app/data

# 暴露1834端口
EXPOSE 1834

# 启动应用
CMD ["node", "filesave.js"]