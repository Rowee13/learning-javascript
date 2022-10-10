//server
const express = require("express");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: ["aslkj21wo56dewkc6n5qei2laskj"],
	})
);
app.use(authRouter);

app.listen(3000, () => {
	console.log("Listening on port 3000");
});

//middleware (deprecated)
// const bodyParser = (req, res, next) => {
// 	if (req.method === "POST") {
// 		req.on("data", (data) => {
// 			const parsed = data.toString("utf8").split("&");
// 			const formData = {};
// 			for (let pair of parsed) {
// 				const [key, value] = pair.split("=");
// 				formData[key] = value;
// 			}
// 			req.body = formData;
// 			next();
// 		});
// 	} else {
// 		next();
// 	}
// };
