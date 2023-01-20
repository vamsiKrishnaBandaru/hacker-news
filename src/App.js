import React from "react"
import "./App.css"
import Header from "./jsFiles/Header"
import Loader from "./jsFiles/Loader"
import NewsList from "./jsFiles/NewsList"
import SearchSection from "./jsFiles/SearchSection"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
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
      `https://hn.algolia.com/api/v1/${this.state.searchBy}?query=${this.state.query}&hitsPerPage=1000&page=${this.state.page}&tags=${this.state.searchType}`
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
          this.loading && <Loader />
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
