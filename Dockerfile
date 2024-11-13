# 開発用のイメージ（Node.jsのみ）
FROM node:20

WORKDIR /app

# パッケージファイルをコピーし、依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# 開発サーバーを起動
EXPOSE 5173
CMD ["npm", "run", "dev"]