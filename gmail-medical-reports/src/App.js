import './App.css';
import React, { Component } from 'react';
import SearchBar from './Components/SearchBar/SearchBar';
import Reports from './Components/Reports/Reports';
import DATA from "./Data/Data"

class App extends Component{

  state = {
    library: [],
    search: '',
    searchResults: DATA,
    excludedWords: '',
    isSearchOptionsDisplay: false,
    isDisplayTxtFile: false,
    idToPass: 0,
    isDisplayTable: true,
    tags: {
      goodreport: [1,2,3,4],
      conditionpresent: [0, 4]
    }
  }
  componentDidMount() {
    this.createDictionary()
  }

  createDictionary = () => {
    let tempState = [];
    for (let i = 0; i < DATA.length; i++) {
      let fileContents = DATA[i].location;
      let fileId = DATA[i].id;
      let test = fileContents.toLowerCase().replace(/[^A-Za-z' ;]/g, "").split(' ');

      let hash = {};
      for (let j = 0; j < test.length; j++) {
        if (!hash[test[j]]) {
          hash[test[j]] = 1;
        } else {
          hash[test[j]]++;
        }
      }
      let currentStorage = { dictionary: hash, id: fileId, location: fileContents }
      tempState.push(currentStorage);
    }
    this.setState({ library: tempState });
  }
  searchData = () => {
    const { library } = this.state;
    const { search } = this.state;
    const { excludedWords } = this.state;

    let searchItems = search.toLowerCase().split(' ');
    let excludedItems = excludedWords.toLowerCase().split(' ');
    let searchResultsItems = [];
    for (let book in library) {
      let wordChecker = true;
      for (let k = 0; k < searchItems.length; k++) {
        if (!library[book].dictionary[searchItems[k]]) {
          wordChecker = false;
        }
      }
      if (excludedWords.length > 0) {
        for (let l = 0; l < excludedItems.length; l++) {
          if (library[book].dictionary[excludedItems[l]]) {
            wordChecker = false;
          }
        }
      }
      if (wordChecker === true) {
        searchResultsItems.push(library[book]);
      }
    }
    this.setState({ ...this.state, searchResults: searchResultsItems, isDisplayTable: true, isDisplayTxtFile: false }, () => console.log(this.state.searchResults));
  }
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.searchData();
    }
  }

  onClickBookRow = (book) => {
    this.setState({ ...this.state, isDisplayTxtFile: true, idToPass: book.id, isDisplayTable: false })
  }

  onClickSearchDropDown = () => {
    this.setState({ isSearchOptionsDisplay: !this.state.isSearchOptionsDisplay })
  }
  onChangeSearchInput = (e) => {
    this.setState({ search: e.target.value })
  }
  onChangeExcludeInput = (e) => {
    this.setState({ excludedWords: e.target.value })
  }

  displayTagResult = item => {
    const { tags } = this.state;
    let tempState=[];
    let currentTag = tags[item];
    for(let book in DATA){
      for(let i=0; i<currentTag.length; i++){
        if(DATA[book].id === currentTag[i]){
          tempState.push(DATA[book]);
        }
      }
    }
    console.log(tempState);
    this.setState({ ...this.state, searchResults: tempState, isDisplayTable: true, isDisplayTxtFile: false }, ()=> console.log(this.state.searchResults));
  }

  displayInbox = () => {
    this.setState({ ...this.state, searchResults: DATA, isDisplayTable: true, isDisplayTxtFile: false });
  }

  addTag = (item, id) => {
    const { tags } = this.state;
    let currentTag = tags[item];
    if(!currentTag.includes(id)){
      currentTag.push(id)
    }
    this.setState({ ...this.state, tags: {...tags, item: currentTag}});
  }
  removeTag = (item, id) => {
    const { tags } = this.state;
    let currentTag = tags[item];
    let newArr=[];
    if(currentTag.includes(id)){
      newArr= currentTag.filter(word => word !== id)
    }
    if(item === "goodreport"){
      this.setState({...this.state, tags: {...tags, "goodreport": newArr}});
    }else if(item === "conditionpresent"){
      this.setState({...this.state, tags: {...tags, "conditionpresent": newArr}});
    }
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Medical Reports</h1>
        </header>
        <div class = "searchBar">
        <SearchBar
                isSearchOptionsDisplay={this.state.isSearchOptionsDisplay}
                onClickSearchDropDown={this.onClickSearchDropDown}
                onClickSearchBtn={this.searchData}
                onChangeSearchInput={this.onChangeSearchInput}
                onChangeExcludeInput={this.onChangeExcludeInput}
                handleKeyDown={this.handleKeyDown}
        />
        </div>
        <div class = "reports">
        <Reports
                isDisplayTable={this.state.isDisplayTable}
                searchResults={this.state.searchResults}
                isDisplayTxtFile={this.state.isDisplayTxtFile}
                idToPass={this.state.idToPass}
                onClick={this.onClickBookRow}
                tags={this.state.tags}
                addTag={this.addTag}
                removeTag={this.removeTag}
              />
        </div>
      </div>
    );
  }
  
}

export default App;
