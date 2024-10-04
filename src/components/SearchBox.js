// SearchBox.js

import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

const SearchBox = ({ searchValue, setSearchValue }) => {
	const handleInputChange = (e) => {
		setSearchValue(e.target.value);
	};

	return (
		<div className="col col-sm-4">
			<div className="search-container">
				<input
					type="text"
					className="form-control search-input"
					placeholder="Search Movies Here..."
					value={searchValue}
					onChange={handleInputChange}
				/>
				<FaSearch className="search-icon" />
			</div>
		</div>
	);
};

export default SearchBox;
