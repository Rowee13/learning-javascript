//server
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passwordConfirmation" placeholder="password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
  `);
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

app.post("/", (req, res) => {
	console.log(req.body);
	res.send("Account created!");
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
