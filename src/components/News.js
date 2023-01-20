function News(props) {
  if (props.title && props.url) {
    return (
      <div className="news" key={props.objectID}>
        <div className="news-head">
          <a
            className="news-title"
            href={
              "https://news.ycombinator.com/item?id=" + props.objectID
            }
          >
            {props.title}
          </a>
          <span> </span>
          <a className="news-url" href={
            props.url
          }>
            ({
              props.url
            })
          </a>
        </div>
        <div className="news-details">
          <span>
            <a href={
              "https://news.ycombinator.com/item?id=" + props.objectID
            }>
              {
                props.points
              } points
            </a>
          </span>
          <span> | </span>
          <span>
            <a href={
              "https://news.ycombinator.com/user?id=" + props.author
            }>
              {
                props.author
              }
            </a>
          </span>
          <span> | </span>
          <span>
            <a href={
              "https://news.ycombinator.com/item?id=" + props.objectID
            }>
              {
                props.num_comments
              } comments
            </a>
          </span>
        </div>
      </div>
    );
  }
}

export default News;
