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

// Blog.create({
//     title: "Test 1",
//     image: "https://source.unsplash.com/collection/8610070/600x400",
//     body: "First blog"
// });

// Redirect root to Index
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

// Index Route
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log("Error retrieving blogs.");
        }
        else {
            res.render("index", {blogs: blogs});     
        }
    });
});

// New blog
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// Create blog
app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, addedBlog)=> {
        if(err) {
            res.render("new");
        }
        else {
            res.redirect("/blogs");
        }
    });
});

// Show a blog
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, rtrBlog) => {
        if(err) {
            res.redirect("/blogs");
        }
        else {
            res.render("show", {blog: rtrBlog});
        }
    });
});

app.listen(3000, () => console.log("Server started!"));