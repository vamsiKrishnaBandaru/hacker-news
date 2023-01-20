import React from "react";

class Header extends React.Component {
   constructor(props) {
      super(props);
   }
   render() {
      return (
         <header>
            <img src="/images/logo.webp" />
            <p className="title"> Hacker News
            </p>
            <div className="search-box">
               <div className="search-icon"></div>
               <input
                  placeholder="Search stories by title, url or author"
                  onKeyDown={this.props.handleKeyPress} />
            </div>
         </header>
      );
   }
}

export default Header;
