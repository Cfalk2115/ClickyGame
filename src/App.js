import React, { Component } from 'react';
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Nav from "./components/Nav";
import Container from "./Container";
// import Row from "./Row";
import Column from "./Column";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

// Random Shuffle of Friend Cards
function randomFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    correctIncorrect: "",
    clicked: [],
  };

  // HandleClick Function
  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  // HandleIncrement Function
  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      correctIncorrect: "You guessed correctly!"
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ correctIncorrect: "You win!" });
    }
    this.handleShuffle();
  };

  // HandleReset Function
  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      correctIncorrect: "You guessed incorrectly!",
      clicked: []
    });
    this.handleShuffle();
  };

  // HandleShuffle Function
  handleShuffle = () => {
    let shuffledFriends = randomFriends(friends);
    this.setState({ friends: shuffledFriends });
  };

  // Render Form
  // Map over this.state.friends and render a FriendCard component for each friend object
    render() {
    return (
      <Wrapper>
        <Nav
          title="Pokemon Clicky Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          correctIncorrect={this.state.correctIncorrect}
        />

        <Title>
          Click on an image, but don't click it more than once!
        </Title>
        {/* <Container> */}
          {/* <Row> */}
            {this.state.friends.map(friend => (
              <Column size="md-3 sm-4">
                <FriendCard
                  key={friend.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={friend.id}
                  image={friend.image}
                />
              </Column>
            ))}
          {/* </Row> */}
        {/* </Container> */}
      </Wrapper>
    );
  }
}

export default App;
