# Marketplace - Environnement de développement

Ce projet utilise 4 services qui doivent être démarrés simultanément pour avoir
l'environnement complet du Marketplace.

## Architecture

                         INTERNET
                            |
                            v
                 +----------------------+
                 |        ngrok         |
                 |      HTTPS public     |
                 +----------+-----------+
                            |
                            v
                 +----------------------+
                 |       Gateway        |
                 |    localhost:8000    |
                 +----------+-----------+
                            |
                 +----------+----------+
                 |                     |
              /api/*                   /*
                 |                     |
                 v                     v
        +----------------+    +----------------+
        | Spring Boot    |    | React / Vite   |
        | localhost:8080 |    | localhost:5173 |
        +-------+--------+    +----------------+
                |
                v
        +----------------+
        |   PostgreSQL   |
        | localhost:5432 |
        +----------------+

Terminal 1
cd C:\Users\miantsa\Downloads\Documents\Freelaka\MarketPlace\gateway
npm install
npm start
Terminal 2
cd C:\Users\miantsa\Downloads\Documents\Freelaka\MarketPlace\backend\marketplace-backend
.\mvnw.cmd spring-boot:run
Terminal 3
.\ngrok http 8000
Terminal 4
cd C:\Users\miantsa\Downloads\Documents\Freelaka\MarketPlace\frontend
npm install
npm run dev
