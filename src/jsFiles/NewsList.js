import React from "react";
import Comments from "./Comments";
import News from "./News";

class NewsList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="news-container">
        {this.props.type == "story" &&
          this.props.news.map((story) => News(story))}
        {this.props.type == "comment" &&
          this.props.news.map((story) => Comments(story))}
      </div>
    );
  }
}

export default NewsList;
