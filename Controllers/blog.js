const BlogModel = require("../Model/blog");
var ObjectId = require("mongoose").Types.ObjectId;
const cloudinary = require("cloudinary").v2;
const { getDataUri } = require("../utils/dataUri");

const addBlogs = async (req, res) => {
  let file = req.file;
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.uploader.upload(
    fileUri.content,
    {
      folder: "blogs",
    },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      return result;
    }
  );

  const { title, category, description } = req.body;
  try {
    const blog = new BlogModel({
      photo: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      title,
      category,
      description,
    });
    await BlogModel.create(blog);
    res
      .status(201)
      .json({ message: "Blog created successfully", status: true, data: blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBlog = async (req, res) => {
  const { title, category, description, id } = req.body;

  try {
    let blog = {};

    let file = req.file;
    let myCloud;

    if (file) {
      const fileUri = getDataUri(file);

      myCloud = await cloudinary.uploader.upload(fileUri.content, {
        folder: "blogs",
      });
    }

    if (myCloud) {
      // If there's a new file uploaded, update the photo information
      blog.photo = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    // Update other fields
    blog.title = title;
    blog.category = category;
    blog.description = description;

    await BlogModel.findOneAndUpdate({ _id: id }, blog);
    res.json({ message: "Blog updated successfully", status: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.body;

  try {
    // Find the blog by id
    const blog = await BlogModel.findById(id);
    let blogData = blog;

    // Check if blog exists
    if (!blogData) {
      return res.status(404).json({ message: "Blog not found" });
    }
    // Delete photo from Cloudinary
    await cloudinary.uploader.destroy(blogData.photo.public_id);

    // Delete the blog document from MongoDB
    await BlogModel.deleteOne({ _id: blogData._id });

    res.json({ message: "Blog deleted successfully", status: true });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ message: err.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find().select("-__v").sort({ createdAt: -1 });

    res.json({
      message: "Blogs fetched successfully",
      status: true,
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addBlogs,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
