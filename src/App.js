import React from "react"
import "./App.css"
import Header from "./jsFiles/Header"
import Loader from "./jsFiles/Loader"
import NewsList from "./jsFiles/NewsList"
import PagesNumbers from "./jsFiles/PagesNumbers"
import SearchSection from "./jsFiles/SearchSection"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      totalPages: 0,
      totalNews: 0,
      query: "",
      news: [],
      searchBy: "search",
      searchType: "story",
    }
    this.loading = false
  }

  searchQuery = (event) => {
    let query = event.target.value
    if (event.target.value.trim() === "") {
      return
    }

    this.setState(
      {
        page: 0,
        query: query,
      },
      this.fetchNews
    )
  }

  searchBy = (event) => {
    let search = "search"

    if (event.target.value !== "popularity") {
      search = "search_by_date"
    }

    this.setState(
      {
        searchBy: search,
        page: 0,
      },
      this.fetchNews
    )
  }

  searchType = (event) => {
    let searchType = "story"

    console.log(event.target.value)

    if (event.target.value !== "story") {
      searchType = "comment"
    }

    this.setState(
      {
        searchType: searchType,
        news: [],
        page: 0,
      },
      this.fetchNews
    )
  }

  changePage = (event) => {
    let page
    if (event.target.textContent === ">>") {
      page = this.state.totalPages - 1
    } else if (event.target.textContent === "<<") {
      page = 0
    } else {
      page += event.target.textContent - 1
    }

    this.setState(
      {
        page: page,
      },
      this.fetchNews
    )
  }

  fetchNews = () => {
    this.loading = true

    this.setState({
      fetchError: false,
    })

    return fetch(
      `https://hn.algolia.com/api/v1/${this.state.searchBy}?query=${this.state.query}&hitsPerPage=50&page=${this.state.page}&tags=${this.state.searchType}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("No response from API")
        }
      })

      .then((data) => {
        this.setState(() => ({
          news: data.hits,
          totalPages: data.nbPages,
          totalNews: data.nbHits,
        }))
      })

      .catch((err) => {
        console.log(err)
        this.setState({
          fetchError: true,
        })
      })

      .finally(() => {
        console.log("Finished Fetching")
        this.loading = false
      })
  }

  render() {
    return (
      <div className="App">

        <Header handleKeyPress={this.searchQuery} />

        <SearchSection
          totalNews={this.state.totalNews}
          searchBy={this.searchBy}
          searchType={this.searchType} />

        {
          this.loading && <Loader/>
        }

        {
          !this.loading &&
          !this.state.fetchError &&
          this.state.news.length > 0 && (
            <NewsList
              news={this.state.news}
              type={this.state.searchType}
            ></NewsList>
          )
        }

        {
          !this.loading &&
          !this.state.fetchError &&
          this.state.news.length > 0 && (
            <PagesNumbers
              page={this.state.page}
              total={this.state.totalPages}
              click={this.changePage}
            ></PagesNumbers>
          )
        }

        {
          !this.loading &&
          !this.state.fetchError &&
          this.state.news.length === 0 && (
            <p className="error">No news found</p>
          )
        }

        {
          !this.loading && this.state.fetchError && (
            <div className="error">Error occured while fetching news.</div>
          )
        }
      </div>
    )
  }

  componentDidMount() {
    this.fetchNews()
  }
}

export default App
