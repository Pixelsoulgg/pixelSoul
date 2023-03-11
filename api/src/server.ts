// src/server.ts
import { app } from "./app";
import { PORT } from "./settings";

const port = PORT || 3000;

app.listen(port, () =>
  console.log(`api listening at http://localhost:${port}`)
);
