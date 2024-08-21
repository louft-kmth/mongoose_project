const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post");

// Connect to MongoDB database
mongoose
	.connect("mongodb://localhost:27017/myBlog", { useNewUrlParser: true })
	.then(() => {
		const app = express();
		app.use(express.json()); // new line

		app.get("/posts", async (req, res) => {
			const posts = await Post.find();
			res.send(posts);
		});

		app.post("/posts", async (req, res) => {
			const post = new Post({
				title: req.body.title,
				content: req.body.content,
			});
			await post.save();
			res.send(post);
		});

		// route get/posts/:id
		app.get("/posts/:id", async (req, res) => {
			try {
				const post = await Post.findById(req.params.id);
				if (!post) {
					return res.status(404).send("Post not found!");
				}
				res.send(post);
			} catch (error) {
				res.status(500).send("Server error");
			}
		});

		//Route delete /posts/:id
		app.delete("/posts/:id", async (req, res) => {
			try {
				const post = await Post.findByIdAndDelete(req.params.id);
				if (!post) {
					return res.status(400).send("post not Found !");
				}
				res.send("Post deleted successfully");
			} catch (error) {
				res.status(500).send("server error");
			}
		});

		app.listen(3000, () => {
			console.log("Server has started!");
		});
	});
