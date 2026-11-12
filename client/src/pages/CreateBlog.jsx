import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBlog } from "../services/api";

function CreateBlog() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        category: "General"
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
        const data = await createBlog(formData);

        if (!data.blog) {
            throw new Error(data.message || "Blog creation failed");
        }

        alert("Blog created successfully!");
        navigate("/");

    } catch (error) {
        setMessage(error.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="create-blog-container">
            <h1>Create New Blog</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter blog title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Enter short description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="content"
                    placeholder="Write your blog content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="General">General</option>
                    <option value="Technology">Technology</option>
                    <option value="Education">Education</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Blog"}
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateBlog;
