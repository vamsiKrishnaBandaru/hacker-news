import React from "react";
import "./App.css";
import Header from "./jsFiles/Header";
import Loader from "./jsFiles/loader";
import NewsList from "./jsFiles/NewsList";
import Pagination from "./jsFiles/Pagination";
import SearchOptions from "./jsFiles/SearchOptions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      totalPages: 0,
      totalNews: 0,
      fetchMs: 0,
      query: "",
      news: [],
      searchBy: "search",
      searchType: "story",
      fetchError: false,
    };
    this.loading = false;
  }

  componentDidMount() {
    this.fetchNews();
  }

  searchBy = (event) => {
    let search = "search";

    if (event.target.value !== "popularity") {
      search = "search_by_date";
    }

    this.setState(
      {
        searchBy: search,
        page: 0,
      },
      this.fetchNews
    );
  };

  searchType = (event) => {
    let searchType = "story";

    console.log(event.target.value);
    if (event.target.value !== "story") {
      searchType = "comment";
    }

    this.setState(
      {
        searchType: searchType,
        page: 0,
        news: [],
      },
      this.fetchNews
    );
  };

  changePage = (event) => {
    let page;
    if (event.target.textContent === ">>") {
      page = this.state.totalPages - 1;
    } else if (event.target.textContent === "<<") {
      page = 0;
    } else {
      page = +event.target.textContent - 1;
    }

    this.setState(
      {
        page: page,
      },
      this.fetchNews
    );
  };

  searchQuery = (event) => {
    if (event.target.value.trim() === "") {
      return;
    }
    this.setState(
      {
        page: 0,
        query: event.target.value,
      },
      this.fetchNews
    );
  };

  fetchNews = () => {
    this.loading = true;

    this.setState({
      fetchError: false,
    });
    return fetch(
      `https://hn.algolia.com/api/v1/${this.state.searchBy}?query=${this.state.query}&hitsPerPage=20&page=${this.state.page}&tags=${this.state.searchType}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("No response from API");
        }
      })
      .then((data) => {
        this.setState(() => ({
          news: data.hits,
          totalPages: data.nbPages,
          totalNews: data.nbHits,
          fetchMs: data.processingTimeMS,
        }));
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          fetchError: true,
        });
      })
      .finally(() => {
        this.loading = false;
      });
  };
  render() {
    return (
      <div className="App">
        <Header handleKeyPress={this.searchQuery}></Header>
        <SearchOptions
          totalNews={this.state.totalNews}
          time={this.state.fetchMs}
          searchBy={this.searchBy}
          searchType={this.searchType}
        ></SearchOptions>
        {this.loading && <Loader></Loader>}
        {!this.loading &&
          !this.state.fetchError &&
          this.state.news.length > 0 && (
            <NewsList
              news={this.state.news}
              type={this.state.searchType}
            ></NewsList>
          )}
        {!this.loading &&
          !this.state.fetchError &&
          this.state.news.length > 0 && (
            <Pagination
              page={this.state.page}
              total={this.state.totalPages}
              click={this.changePage}
            ></Pagination>
          )}
        {!this.loading &&
          !this.state.fetchError &&
          this.state.news.length === 0 && (
            <p className="error">No news found</p>
          )}
        {!this.loading && this.state.fetchError && (
          <div className="error">An Error occured while fetching the news.</div>
        )}
      </div>
    );
  }
}

export default App;
