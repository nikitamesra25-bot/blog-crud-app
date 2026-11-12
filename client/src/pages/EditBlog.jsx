import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlog, updateBlog } from "../services/api";

function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        category: "General"
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlog(id);

                if (!data.blog) {
                    setMessage("Blog not found");
                    return;
                }

                setFormData(data.blog);
            } catch (error) {
                setMessage("Unable to load blog");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await updateBlog(id, formData);

            if (!data.blog) {
                throw new Error(data.message || "Update failed");
            }

            alert("Blog updated successfully!");
            navigate(`/blog/${id}`);
        } catch (error) {
            setMessage(error.message || "Unable to update blog");
        }
    };

    if (loading) return <h2>Loading blog...</h2>;

    return (
        <div className="edit-blog-container">
            <h1>Edit Blog</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Blog title"
                    required
                />

                <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />

                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Blog content"
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

                <button type="submit">Update Blog</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default EditBlog;
