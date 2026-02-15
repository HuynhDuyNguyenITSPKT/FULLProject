// chạy project
docker-compose up --build


// kiểm tra
docker ps

//Dừng hệ thống
docker-compose down

// Xóa toàn bộ container, network, volumes, images
docker system prune -a --volumes

// chạy lại ví du
docker-compose up --build backend

docker compose up -d