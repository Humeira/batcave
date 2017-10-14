import React from 'react';
import axios from 'axios';
const api = process.env.REACT_APP_GITHUB_API_URL;
const username = process.env.REACT_APP_GITHUB_USERNAME;
class Repo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: username,
            repo: []
        }
    }

    /**
     * Get page number from return headers
     * @param param
     * @returns {*}
     */
    extractNumber(param) {
        console.log(param);
        let pageNumber = param.split('?page=');
        return pageNumber[1].match(/\d+/)[0];
    }

    /**
     * Get the pages if more repos starred
     * @param username
     */
    getPages(username) {
        let url = `${api}/${username}/starred`;
        var self = this;
        axios.get(url)
            .then(function (response) {
                console.log(response);
                if (response.headers.link) {
                    let link = response.headers.link;
                    link = link.split(',', 2);
                    const firstPage = self.extractNumber(link[0]) - 1;
                    const lastPage = self.extractNumber(link[1]);
                    getRepos(firstPage, lastPage);
                }
                else{
                    //fetch only the first one if less
                    getRepos(1, 0);
                }
            }).catch((error) => console.log('Oops, an error has occured'));
    }

    /**
     * Get all the repos
     * @param firstPage
     * @param lastPage
     */
    getRepos(firstPage, lastPage){

    }

    componentDidMount() {
        this.fetchRepos(this.state.username);
    }

    render() {
        return (
            < h1 > {this.state.username} </h1 >
        );
    }
}

export default Repo;