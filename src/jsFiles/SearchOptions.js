function SearchOptions(props) {
  return (
    <div className="search-options">
      <div>
        <span style={{ margin: "0 5px" }}>Search</span>
        <select name="type" id="search-type" onChange={props.searchType}>
          <option value="story">Stories</option>
          <option value="comments">Comments</option>
        </select>
        <span style={{ margin: "0 5px" }}> by </span>
        <select name="type" id="search-by" onChange={props.searchBy}>
          <option value="popularity">Popularity</option>
          <option value="date">Date</option>
        </select>
      </div>
      <div className="search-records">
        <span>{props.totalNews.toLocaleString()} results </span>
        <span>({props.time / 1000} seconds)</span>
      </div>
    </div>
  );
}

export default SearchOptions;
