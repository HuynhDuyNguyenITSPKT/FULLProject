docker build --build-arg NEXT_PUBLIC_API_URL=http://localhost:8080 -t nextjs-app .

docker run -p 3000:3000 nextjs-app