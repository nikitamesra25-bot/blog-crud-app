import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlog, deleteBlog } from "../services/api";

function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlog(id);
                setBlog(data.blog);
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmDelete) return;

        try {
            const data = await deleteBlog(id);

            if (data.message === "Blog deleted successfully") {
                alert("Blog deleted successfully!");
                navigate("/");
            } else {
                alert(data.message || "Unable to delete blog");
            }
        } catch (error) {
            alert("Something went wrong");
        }
    };

    if (loading) return <h2>Loading blog...</h2>;

    if (!blog) return <h2>Blog not found!</h2>;

    return (
        <div className="blog-details-container">
            <h1>{blog.title}</h1>

            <p>{blog.description}</p>

            <p>{blog.content}</p>

            <span>Category: {blog.category}</span>

            <p>
                Published on:{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <button onClick={() => navigate(`/edit-blog/${id}`)}>
                Edit Blog
            </button>

            <button onClick={handleDelete}>
                Delete Blog
            </button>
        </div>
    );
}

export default BlogDetails;
