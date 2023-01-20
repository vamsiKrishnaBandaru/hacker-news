function SearchSection(props) {
  return (
    <div className="search-options">
      <div>
        <span>Search</span>

        <select name="type" id="search-type" onChange={props.searchType}>
          <option value="story">Stories</option>
          <option value="comments">Comments</option>
        </select>

        <span> by </span>

        <select name="type" id="search-by" onChange={props.searchBy}>
          <option value="popularity">Popularity</option>
          <option value="date">Date</option>
        </select>

      </div>

      <div className="search-time">
        <span>{props.totalNews.toLocaleString()} results </span>
        <span>({props.time / 1000} seconds)</span>
      </div>

    </div>
  );
}

export default SearchSection;