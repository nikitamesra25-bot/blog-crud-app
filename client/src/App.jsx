import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import BlogDetails from "./pages/BlogDetails";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-blog" element={<CreateBlog />} />
                <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path="/edit-blog/:id" element={<EditBlog />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
