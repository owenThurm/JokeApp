import React, { useState } from 'react';
import axios from 'axios';

function JokeApp() {

  const [joke, setJoke] = useState('');
  const [upVotes, setUpVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);
  const [jokeID, setJokeID] = useState('');
  const [voted, setVoted] = useState(true);

  function getJoke() {

    axios({
      'method': 'GET',
      'url': 'https://joke3.p.rapidapi.com/v1/joke',
      'headers': {
        'x-rapidapi-key': '9be102c92dmsh190ac2792aa9da3p111139jsn765a575a921c'
      }
    }).then(response => {
      console.log(response);
      setJoke(response.data.content);
      setUpVotes(response.data.upvotes);
      setDownVotes(response.data.downvotes);
      setJokeID(response.data.id);
      setVoted(false);
    }).catch(err => {
      console.log(err);
    });
  }

  function upVote() {

    if(!voted) {
      axios({
        'method':'POST',
        'url':`https://joke3.p.rapidapi.com/v1/joke/${jokeID}/upvote`,
        'headers':{
        'x-rapidapi-key':'9be102c92dmsh190ac2792aa9da3p111139jsn765a575a921c'
        },'data':{}
      }).then(response => {
        console.log(response);
        setUpVotes(response.data.upvotes);
        setVoted(true);
      }).catch(err => {
        console.log(err);
      });
    }
  }

  function downVote() {

    if(!voted) {
      axios({
        'method': 'POST',
        'url': `https://joke3.p.rapidapi.com/v1/joke/${jokeID}/downvote`,
        'headers': {
          'x-rapidapi-key': '9be102c92dmsh190ac2792aa9da3p111139jsn765a575a921c'
        },
        'data': {}
      }).then(response => {
        console.log(response);
        setDownVotes(response.data.downvotes);
        setVoted(true);
      }).catch(err => {
        console.log(err);
      });
    }
  }

  return(
    <div>
      <h3>Joke App!</h3>
      <h4>{joke}</h4>
      <h5>Up Votes: {upVotes}   Down Votes: {downVotes}</h5>
      <button onClick={upVote}>Up Vote</button>
      <button onClick={downVote}>Down Vote</button>
      <button onClick={getJoke}>New Joke</button>
    </div>
  );

}

export default JokeApp;