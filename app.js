const bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      express    = require("express"),
      app        = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/blogs_app")

var blogSchema = new mongoose.Schema(
    {
        title: String,
        image: String,
        body: String,
        created: {type: Date, default: Date.now}
    }
);

var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title: "Test 1",
    image: "https://source.unsplash.com/collection/8610070/600x400",
    body: "First blog"
});

app.get("/", (req, res) => {
    res.send("Initialized!");
});

app.listen(3000, () => console.log("Server started!"));