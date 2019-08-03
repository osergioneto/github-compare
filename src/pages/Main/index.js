import React, { Component } from "react";
import { Container, Form } from "./styles";
import moment from "moment";
import logo from "../../assets/logo.png";

import CompareList from "../../Components/CompareList";

class Main extends Component {
  state = {
    repositoryInput: "",
    repositories: []
  };

  handleSubmit = e => {
    e.preventDefault();
    try {
      fetch(`https://api.github.com/repos/${this.state.repositoryInput}`)
        .then(res => res.json())
        .then(result => {
          result.lastCommit = moment(result.pushed_at).fromNow();
          this.setState({
            repositoryInput: "",
            repositories: [...this.state.repositories, result]
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="" />

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="usuario/nome-do-repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">+</button>
        </Form>

        <CompareList
          repositories={this.state.repositories}
          error={this.state.error}
        />
      </Container>
    );
  }
}

export default Main;
