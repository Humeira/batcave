import React from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_GITHUB_API_URL;
const username = process.env.REACT_APP_GITHUB_USERNAME;
const token = process.env.REACT_APP_GITHUB_TOKEN;

class Fetch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: username,
            first_page: '',
            last_page: '',
            repos: []
        }

    }

    /**
     * Get page number from return headers
     * @param param
     * @returns {*}
     */
    extractNumber(param) {
        var pageNumber = param.split('page=');
        return pageNumber[1].match(/\d+/)[0];
    }


    starsCheck() {
        const self = this;
        const url = `${apiUrl}/${username}/starred`;
        axios({
            method: 'GET',
            url: url,
            headers: {
                'authorization': `token ${token}`,
            }
        }).then(function (response) {
            if (response.headers.link) {
                var link = response.headers.link;
                link = link.split(',', 2);
                self.setState(
                    {
                        first_page: self.extractNumber(link[0]) - 1,
                        last_page: self.extractNumber(link[1])
                    }
                )
                self.fetchRepos(self.state.last_page);
            }
            else {
                self.setState(
                    {
                        first_page: 1,
                        last_page: null
                    }
                );
                var tempArray = new Array();
                response.data.forEach(function(repo){
                    tempArray.push({
                        name: repo.name,
                        owner: repo.owner.login,
                        url: repo.html_url,
                        owner_url: repo.owner.url,
                        description: repo.description,
                        ssh_url: repo.ssh_url,
                        clone_url: repo.clone_url,
                        stars: repo.stargazers_count,
                        forks: repo.forks_count
                    });
                    self.setState({
                        repos: tempArray
                    })
                });



            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    fetchRepos(lastPage) {
        const self = this;
        const tempArray = new Array();
        if(lastPage !== null){
            for(var i =1; i<=lastPage; i++){
                const url = `${apiUrl}/${this.state.username}/starred?page=` + i;
                axios({
                    method: 'GET',
                    url: url,
                    headers: {
                        'authorization': `token ${token}`,
                    }
                }).then(function (response) {
                    const reposList = response.data;
                    reposList.forEach(function (repo) {
                        tempArray.push({
                            name: repo.name,
                            owner: repo.owner.login,
                            url: repo.html_url,
                            owner_url: repo.owner.url,
                            description: repo.description,
                            ssh_url: repo.ssh_url,
                            clone_url: repo.clone_url,
                            stars: repo.stargazers_count,
                            forks: repo.forks_count
                        });
                        self.setState({
                            repos: tempArray
                        });
                    });
                });
            }

        }

    }

    componentDidMount(){
        this.starsCheck();
    }

    render() {
        return (
            <div>
            {this.state.repos.map(function(item, index){
                return    <li key={index}>{item.name}, {item.owner} </li>

            })}</div>
    );
    }


}

export default Fetch;