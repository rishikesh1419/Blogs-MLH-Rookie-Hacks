const bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      express    = require("express"),
      app        = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/blogs")

app.get("/", (req, res) => {
    res.send("Initialized!");
});

app.listen(3000, () => console.log("Server started!"));