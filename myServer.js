let express = require("express");
const cors = require("cors");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var port = process.env.port || 2410;
app.listen(port, () => console.log(`Listening on port ${port}!`));
let axios = require("axios");

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.post("/myServer/allRequests", async (req, res) => {
  let token = req.header("authorization");
  let body = req.body;
  console.log(body);

  try {
    if (body.method === "GET") {
      let response = await axios.get(body.fetchURL, {
        headers: { authorization: token },
      });
      console.log("" + response.data);
      res.send("" + response.data);
    } else {
      let response = await axios.post(body.fetchURL, body.data, {
        headers: { authorization: token },
      });
      console.log(response.data);
      res.send(response.data);
    }
  } catch (ex) {
    if (ex.response) {
      let { status, statusText } = ex.response;
      console.log(status, statusText);
      res.status(status).send(statusText);
    }
  }
});
