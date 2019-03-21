import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import path from "path";

const port = process.env.PORT;
const siteName = process.env.SITE_NAME;
const app = express();
app.use(bodyParser.json());

/* API */

const apiRouter = express.Router();

apiRouter.get("/hello", (_req, res) => res.send("Hello World!"));

const apiRoute = siteName ? `/${siteName}/api` : "/api";
app.use(apiRoute, apiRouter);

/* Web */

const webRouter = express.Router();
const staticPath = path.resolve(__dirname, "static");
webRouter.use("/static", express.static(staticPath));
webRouter.get("/favicon.ico", getFile("favicon.ico"));
webRouter.get("/manifest.json", getFile("manifest.json"));
webRouter.get("*", getFile("index.html"));

function getFile(fileName: string) {
    return (_req: Request, res: Response) => {
        const filePath = path.resolve(__dirname, fileName);
        res.sendFile(filePath);
    };
}

const webRoute = siteName ? `/${siteName}` : "/";
app.use(webRoute, webRouter);

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening at http://localhost:${port}/`);
});
