docker build . -t nodeproxy

docker run --name=nodeproxy -p 1834:1834 -v C:\Users\Administrator\Desktop\github\nodeproxy\data:/app/data nodeproxy