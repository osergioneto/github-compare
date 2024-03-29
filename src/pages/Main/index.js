import React, { Component } from "react";
import { Container, Form } from "./styles";
import moment from "moment";
import logo from "../../assets/logo.png";

import CompareList from "../../Components/CompareList";

class Main extends Component {
  state = {
    isLoading: false,
    repositoryInput: "",
    repositories: [],
    repositoryError: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
    fetch(`https://api.github.com/repos/${this.state.repositoryInput}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(result => {
        result.lastCommit = moment(result.pushed_at).fromNow();
        this.setState({
          repositoryInput: "",
          repositories: [...this.state.repositories, result],
          repositoryError: false
        });
      })
      .catch(error => {
        this.setState({
          repositoryError: true
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="" />

        <Form
          withError={this.state.repositoryError}
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            placeholder="usuario/nome-do-repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.isLoading ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
              "+"
            )}
          </button>
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
