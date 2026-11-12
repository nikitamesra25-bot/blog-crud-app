function SearchBar({ searchTerm, setSearchTerm, category, setCategory }) {
    return (
        <div className="search-filter-container">

            <input
                type="text"
                placeholder="Search blogs by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="All">All Categories</option>
                <option value="General">General</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>

        </div>
    );
}

export default SearchBar;
