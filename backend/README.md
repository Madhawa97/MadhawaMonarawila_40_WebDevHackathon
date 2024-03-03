# BFF

## API Document
[Postman Collection](https://lunar-eclipse-212668.postman.co/workspace/Team-Workspace~005b058f-ebc4-4897-8cae-4e76a39061a3/collection/16807701-8d4cfc75-d0ab-40d9-940b-44bf4a8d2034?action=share&creator=16807701)

### Run locally
- Add `.env` file with following/ similar content
```
JWT_SECRET=speedandpower
PORT=3010
```
- Install dependencies
  ```shell
  npm i
  ```
- Run dev script
  ```shell
  npm run dev
  ```

### Folder Structure

```
/src
  /controllers
    authenticationController.ts
    userController.ts
  /routes
    authenticationRoutes.ts
    userRoutes.ts
  /services
    authenticationService.ts
    userService.ts
  /models
    User.ts
  app.ts
  tsconfig.json
```