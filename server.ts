import type Express from "@types/express";
import type { NextFunction } from "@types/express";
import { configDotenv } from "dotenv";
import express from "express";
import fs from "fs";
import http, { Server } from "http";
import path from "path";
import React, { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import App from "~/App";

const app: Express.Application = express();

configDotenv({ override: true, quiet: true });

app.use(express.json());
app.use(express.static("dist"));
app.get(
  "/api/proxy",
  (req: Express.Request, res: Express.Response, next: NextFunction): void => {
    if (!req.query.url) {
      res.header("Content-Type", "text/plain").status(400).send("Error");
      return;
    }

    const headers: Headers = new Headers();
    if (req.header("Authorization")) {
      headers.append("Authorization", req.header("Authorization") ?? "");
    }

    fetch(req.query.url, {
      method: "GET",
      headers: headers,
    })
      .then((resp: Response): void => {
        res.header("Content-Type", resp.headers.get("Content-Type"));
        resp
          .text()
          .then((text: string): void => {
            res.send(text);
          })
          .catch(next);
      })
      .catch(next);
  },
);

app.post(
  "/api/rpc",
  (req: Express.Request, res: Express.Response, next: NextFunction): void => {
    if (!req.query.url) {
      res.json({
        jsonrpc: "2.0",
        id: req.body.id,
        error: {
          message: "Missing URL",
        },
      });
      return;
    }

    const headers: Headers = new Headers();
    if (req.header("Authorization")) {
      headers.append("Authorization", req.header("Authorization") ?? "");
    }
    if (req.header("Content-Type")) {
      headers.append("Content-Type", req.header("Content-Type") ?? "");
    }

    fetch(req.query.url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(req.body),
    })
      .then((resp: Response): void => {
        resp
          .json()
          .then((json): void => {
            res.json(json);
          })
          .catch(next);
      })
      .catch(next);
  },
);

//app.use(vite.middlewares);

const indexPath: string = path.join(path.resolve(), "dist/index.html");
const template: string = fs.readFileSync(indexPath, "utf-8");
app.use("*all", (req: Express.Request, res: Express.Response): void => {
  const url: string = req.originalUrl;

  const app: ReactNode = React.createElement(App, { url: url });

  let status: number = 200;

  let rendered: string;
  try {
    rendered = renderToString(app);
  } catch (e) {
    if (e.message === "404_NOT_FOUND") {
      status = 404;
      rendered = "<span>404 - Not Found</span>";
    } else {
      console.error(e);
      status = 500;
      rendered = "<span>500 - Internal Server Error</span>";
    }
  }

  const html: string = template.replace("<!--root-->", rendered);

  res.status(status).send(html);
});

const port: number = parseInt(process.env.SERVER_PORT) || 3000;

const server: Server = http.createServer(app).listen(port, (): void => {
  console.info(`Server is running in port ${port}.`);
});

export default server;
