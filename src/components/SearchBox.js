// SearchBox.js

import React from 'react';

const SearchBox = ({ searchValue, setSearchValue }) => {
	const handleInputChange = (e) => {
		setSearchValue(e.target.value);
	};

	return (
		<div className='col col-sm-4'>
			<input
				type="text"
				className="form-control"
				placeholder="Search Movies Here..."
				value={searchValue}
				onChange={handleInputChange}
			/>
		</div>

	);
};

export default SearchBox;
