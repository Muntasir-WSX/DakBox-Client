import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-lg mx-auto mb-8 relative">
            <div className="relative w-full">
                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Search district or area..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-[#D4E96D] outline-none text-sm transition-all"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <button 
                type="submit"
                className="bg-[#D4E96D] hover:bg-[#c1d650] text-black font-bold py-3 px-8 rounded-full transition-colors text-sm shadow-md"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBox;