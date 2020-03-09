# Some things to note:

- I used a framework I am currently building to generate a lot of these files. The dockerfiles are not designed to work with this current set up, as currently this framewokr only supports mongo. But I wanted to keep them in here for reference. Given more time, I definitely would have dockerized this entire application and deployed it using dockerized containers.

# Database: 

I had the database running on localhost as the root user. This is configured in `src/server.ts` inside the `connectDb` method. 
Rows and collums were kept as they were in the csv with no modifications.

# Running project:

For optimal performance

run
```
// typescript
tsc
```
followed by
```
npm start
```

alternativaley with ts-node installed
```
ts-node src/index.js
```

# Some things I would have changed:

-Given more time, I would have really liked to have dockerized the application. 
-Originally I had created a separate database controller because I liked the idea of keeping direct database interactions separate from everything else. In the end though, this resulted in the prices controller basically just calling functions and not doing much else. In hindsight, I would have prefered to design the database controller as a sort of query generator and database interface. Using an object of parameters passed in by the various controllers. 
-Of course, given more time I would have included unit tests. Unfortunately I wasn't able to implement test generation into my tool in time.


## ENV example

```env
DB_PASS=[database user password]
```