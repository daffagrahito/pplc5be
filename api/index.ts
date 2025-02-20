import cors from "cors";
import express from "express";

require("dotenv").config();

const PORT: string = process.env.PORT!;

const app = express();

const whitelist: string[] = [];

const PROD = process.env.PROD_CLIENT_URL;

if (PROD) {
  whitelist.push(PROD);
}

console.log("PROD", PROD)

const corsOptions: cors.CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('PPL C-5');
});

export default app;