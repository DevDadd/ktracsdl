@echo off
echo Đang khoi tao container ArangoDB moi...
docker run -d --name my-local-arangodb -p 8529:8529 -e ARANGO_ROOT_PASSWORD=123456 arangodb:3.11.13

echo Cho 10 giay de database khoi dong hoan toan...
timeout /t 10 /nobreak

echo Dang do du lieu vao database...
docker run --rm -v "%CD%/arangodb-dump:/dump" arangodb:3.11.13 arangorestore --server.endpoint tcp://host.docker.internal:8529 --server.database fitness_app --server.username root --server.password 123456 --input-directory /dump --create-database true

echo Hoan tat!
pause