import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header>
        <img src="/images/logo.webp"></img>
        <p className="logo-name">
          Search <br /> Hacker News
        </p>
        <div className="search-container">
          <div className="image-container">
            <div className="search-icon"></div>
          </div>
          <input
            placeholder="Search stories by title, url or author"
            onKeyDown={this.props.handleKeyPress}
          ></input>
        </div>
      </header>
    );
  }
}

export default Header;
