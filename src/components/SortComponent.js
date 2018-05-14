import React from "react";

const SortComponent = (props) => {

    return (
        <div className="center-align">
            <div className="sortby--label valign-wrapper"><h6 className="sortby--label__font">Sort by:</h6></div>
            <select className="sortby--dropdown" onChange={(e) => props.sortTours(e.target.value)}>
                <option value="rating">Popularity</option>
                <option value="price">Price</option>
            </select>
        </div>
    )
}

export default SortComponent;

