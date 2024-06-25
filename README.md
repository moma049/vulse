This is a full-stack to-do list application built using Next.js for the frontend, Express.js for the backend, and Prisma for database interactions with SQLite.
To run the Project Clone the Repository, Then follow the following steps:
1. Navigate to the backend directory using 'cd backend'
2. install the backend dependencies using 'npm install'
3. migrate the prisma schema to your database using :
   npx prisma migrate dev --name init
   npx prisma generate
4. start the development server using 'npx ts-node src/index.ts'
5. navigate back to the  main directory
6. install the frontend dependencies using 'npm install'
7. start the frontend server using 'npm run dev'

   The application is run on 'http://localhost:3000'
   The server is run on 'http://localhost:3001'
