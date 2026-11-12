import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../services/api";
import SearchBar from "../components/SearchBar";

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogs();
                setBlogs(data.blogs || []);
            } catch (err) {
                setError("Unable to load blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch = blog.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesCategory =
            category === "All" || blog.category === category;

        return matchesSearch && matchesCategory;
    });

    if (loading) return <h2>Loading blogs...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div className="home-container">
            <h1>Welcome to BlogSpace</h1>
            <p>Explore blogs and share your thoughts.</p>

            <h2>All Blogs</h2>

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                category={category}
                setCategory={setCategory}
            />

            {filteredBlogs.length === 0 ? (
                <div className="empty-state">
                    {blogs.length === 0 ? ( 
                        <>
                        <h3>No blogs yet!</h3>
                        <p>Be the first to share your thoughts.</p>
                        <Link to="/create-blog" className="create-link">
                        Create Your First Blog
                        </Link>
                        </>
                        ) : (
                        <>
                        <h3>No matching blogs found!</h3>
                        <p>Try another title or select a different category.</p>
                        </>
                    )}
                    </div>
                    ) : (
                <div className="blogs-container">
                    {filteredBlogs.map((blog) => (
                        <Link
                            to={`/blog/${blog._id}`}
                            className="blog-card"
                            key={blog._id}
                        >
                            <h3>{blog.title}</h3>
                            <p>{blog.description}</p>
                            <span>{blog.category}</span>
                            <p>
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
