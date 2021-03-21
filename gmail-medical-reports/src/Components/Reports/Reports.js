import React, { Component } from 'react';
import "./Reports.css"
import DATA from "../../Data/Data";

class Reports extends Component{
    state = {
        1: this.props.searchResults.slice(0, 19),
        2: this.props.searchResults.slice(20, 39),
        3: this.props.searchResults.slice(40, 59),
        4: this.props.searchResults.slice(60, 79)
    }

    componentDidUpdate(prevProps) {
        if (this.props.searchResults !== prevProps.searchResults) {
            this.setState({
                1: this.props.searchResults.slice(0, 19),
                2: this.props.searchResults.slice(20, 39),
                3: this.props.searchResults.slice(40, 59),
                4: this.props.searchResults.slice(60, 79),
                currentPage: 1
            })
    }
}

pagination = (currPage) => {
    this.setState({ currentPage: currPage })
}
paginationNext = (currPage) => {
    this.setState({ currentPage: currPage + 1 })
}
paginationPrev = (currPage) => {
    this.setState({ currentPage: currPage - 1 })
}

render() {
    return (
        <div className="reportsContainier">
            {this.props.isDisplayTable ?
                <table class="table table-hover table-bordered">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Medical Reports</th>
                            <th scope="col">Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state[this.state.currentPage].map((data) =>
                            <tr onClick={() => this.props.onClick(data)}>
                                <th scope="row">{data.id}</th>
                                <td>{DATA[data.id].location.substring(0, 105)}...</td>
                                <td>{this.props.tags.goodreport.includes(data.id) ? "#goodreport" : null}
                                    {this.props.tags.conditionpresent.includes(data.id) ? " #conditionpresent" : null}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                : null
            }
            {this.props.isDisplayTable ?
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className={this.state.currentPage === 1 ? "page-item disabled" : "page-item"}>
                            <a className="page-link" aria-label="Previous" onClick={() => this.paginationPrev(this.state.currentPage)}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link" onClick={() => this.pagination(1)}>1</a></li>
                        {this.props.searchResults.length > 19 ?
                            <li className="page-item"><a className="page-link" onClick={() => this.pagination(2)}>2</a></li>
                            : null}
                        {this.props.searchResults.length > 40 ?
                            <li className="page-item"><a className="page-link" onClick={() => this.pagination(3)}>3</a></li>
                            : null}
                        {this.props.searchResults.length > 60 ?
                            <li className="page-item"><a className="page-link" onClick={() => this.pagination(4)}>4</a></li>
                            : null}
                        <li className={this.state[this.state.currentPage + 1].length > 0 ? "page-item" : "page-item disabled"}>
                            <a className="page-link" aria-label="Next" onClick={() => this.paginationNext(this.state.currentPage)}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                : null}
            {this.props.isDisplayTxtFile ?
                <div>
                    {this.props.tags.goodreport.includes(this.props.idToPass) ?
                        <button type="button" class="btn btn-danger tagbutton" onClick={() => this.props.removeTag("goodreport", this.props.idToPass)}>- goodreport</button>
                        : <button type="button" class="btn btn-success tagbutton" onClick={() => this.props.addTag("goodreport", this.props.idToPass)}>+ goodreport</button>}

                    {this.props.tags.conditionpresent.includes(this.props.idToPass) ?
                        <button type="button" class="btn btn-danger tagbutton" onClick={() => this.props.removeTag("conditionpresent", this.props.idToPass)}>- conditionpresent</button>
                        : <button type="button" class="btn btn-success tagbutton" onClick={() => this.props.addTag("conditionpresent", this.props.idToPass)}>+ conditionpresent</button>}
                    <iframe title="some value" width="100%" height="800px" src={`${BOOKS[this.props.idToPass].url}`}></iframe>
                </div>
                : null}
        </div>
    )
}
}

export default Reports;