const API_URL = "https://blog-crud-app-11mq.onrender.com/api/blogs";
export const getBlogs = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const getBlog = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
};

export const createBlog = async (blogData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(blogData)
    });

    return response.json();
};

export const updateBlog = async (id, blogData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(blogData)
    });

    return response.json();
};

export const deleteBlog = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    return response.json();
};
