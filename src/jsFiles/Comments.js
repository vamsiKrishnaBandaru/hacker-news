function Comments(props) {
  return (
    <div className="news" key={props.objectID}>
      <div className="news-details">
        <span>
          <a href={"https://news.ycombinator.com/item?id=" + props.objectID}>
            {props.points || 0} points
          </a>
        </span>
        <span> | </span>
        <span>
          <a href={"https://news.ycombinator.com/user?id=" + props.author}>
            {props.author}
          </a>
        </span>
        <span> | </span>
        <span>
          <a href={"https://news.ycombinator.com/item?id=" + props.parent_id}>
            parent
          </a>
        </span>
        <span> | </span>
        <span>
          <span>on: </span>
          <a href={"https://news.ycombinator.com/item?id=" + props.story_id}>
            {props.story_title}
          </a>
        </span>
      </div>
      <div
        
      />
    </div>
  );
}

export default Comments;
