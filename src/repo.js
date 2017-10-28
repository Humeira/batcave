import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
const apiUrl = process.env.REACT_APP_GITHUB_API_URL;
const username = process.env.REACT_APP_GITHUB_USERNAME;
const token = process.env.REACT_APP_GITHUB_TOKEN;

const CardWrapper = styled.section`
    // background: #0069ff;
    display: grid;
    padding: 20px;
    @media (min-width: 991px){
         grid-template-columns: repeat(5, 1fr);
    }
    grid-gap: 10px;
`

const Card = styled.a`
    @media (min-width: 991px){
        max-width: 250px;
        height: 150px;
        overflow: auto;
        margin: 30px 0;
    }
    box-shadow: 0 10px 25px rgba(50, 50, 93, .1), 0 5px 15px rgba(0, 0, 0, .07);
    padding: 20px;
    background: #f4f8fb;
    border-top: 3px solid #0069ff;
    text-decoration: none;
`

const Title = styled.h2`
    margin: 0;
    padding-bottom: 5px;
    font-size: 16px;
    font-weight: 400;
    color: #333;
    border-bottom: 1px solid #e6e6e6;
  
`

const Author = styled.span`
    font-size: 14px;
    font-weight: 100;
    font-weight: 100;
    font-style: italic;
    color: #333;
`

const Description = styled.p`
    margin: 0;
    font-size: 14px;
    font-weight: 300;
    color: #333;
    padding: 10px 0;
    word-wrap:break-word;
`

class Repo extends React.Component {
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
            <CardWrapper>
            {this.state.repos.map(function(repo, index){
                return <Card key={index} href={repo.url}>
                            <Title>{repo.name}</Title>
                            <Author>by {repo.owner}</Author>
                            <Description>{repo.description}</Description>
                            <img src={'https://img.shields.io/github/forks/' + repo.owner + '/' + repo.name + '.svg?style=social&label=Fork'} alt=""/>
                            <img src={'https://img.shields.io/github/stars/' + repo.owner + '/' + repo.name + '.svg?style=social&label=Stars'} alt=""/>
                        </Card>
            })}
            </CardWrapper>
    );
    }


}

export default Repo;