import React from "react"
import "./App.css"
import Header from "./components/Header"
import Loader from "./components/Loader"
import NewsList from "./components/NewsList"
import SearchSection from "./components/SearchSection"

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
      loading: false
    }
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

    this.setState({
      fetchError: false,
      loading: true
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
        this.state.loading = false
      })
  }

  render() {
    return (
      <div className="App">

        <Header handleKeyPress={
          this.searchQuery
        } />

        <SearchSection
          totalNews={
            this.state.totalNews
          }
          searchBy={
            this.searchBy
          }
          searchType={
            this.searchType
          } />

        {
          this.state.loading && <Loader />
        }

        {
          !this.state.loading &&
          !this.state.fetchError &&
          this.state.news.length > 0 &&
          (
            <NewsList
              news={
                this.state.news
              }
              type={
                this.state.searchType
              }
            />
          )
        }

        {
          !this.state.loading &&
          !this.state.fetchError &&
          (
            <p className="errorMessage">No news found</p>
          )
        }

        {
          !this.state.loading &&
          !this.state.fetchError &&
          (
            <div className="errorMessage">Error occured while fetching news.</div>
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
