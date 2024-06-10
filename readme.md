Backend Application:

1. Create an empty folder and open it in your code editor (VS Code).
2. Open the terminal in the VS Code.
3. Run the following command to create a package.json file:

```
npm init -y
```

4. Install the express package:

```
npm install express
```

Install the nodemon package:

```
npm install nodemon --save-dev
```

5. Create a new file named index.js and add the following code:

```javascript
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

6.Update the scripts in the package.json file:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

7. Run the following command to start the server:

```
npm run dev
```

8. Open your browser and go to http://localhost:3000 to see the "Hello World" message.
