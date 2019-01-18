import React, { Component } from 'react';
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import teams from "./teams.json";

var shuffle = require('shuffle-array');

let score = 0
let highScore = 0
let text = "Click on your favorite Big 12 team to begin!"

class App extends Component {
  state = {
    teams,
    score,
    clicked: [],
  };

  teamShuffle = id => {
    text = "Don't click the same team twice!"
    let currentClick = this.state.clicked;
    if (this.state.clicked.indexOf(id) === -1) {
      currentClick.push(id);
      score += 1;
      shuffle(teams);
    }
    else {
      score = 0;
      text = "Looks like you need to review the Big 12."
      currentClick = []
    }

    if (score > highScore) {
      highScore = score;
    }

    this.setState({ clicked: currentClick })
  };


  render() {
    console.log(this.state.teams);
    console.log(this.state.clicked);
    return (
      <Wrapper>
        <Title>
          <nav className='navbar navbar-light bg-light'>
            <h1 id="unique">{text} </h1>
            <h1>Score: <span id="currentScore">{score}</span></h1>
            <h1>High Score: <span id="highScore">{highScore}</span></h1>
          </nav>
        </Title>
        {this.state.teams.map(friend => (
          <Card
            teamShuffle={this.teamShuffle}
            id={friend.id}
            key={friend.id}
            image={friend.image}
            clicked={friend.clicked}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
