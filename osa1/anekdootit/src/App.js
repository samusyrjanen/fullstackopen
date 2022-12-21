import { useState } from 'react'

const Button = ({text, type}) => {
  return (
    <button onClick={type}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [votes, setVotes] = useState(Array.apply(null, {length: anecdotes.length}).map(function() {return 0;}))

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const [selected, setSelected] = useState(0)
  const roll = () => {
    return (
      getRandomInt(anecdotes.length)
    )
  }
  const rollClick = () => {
    setSelected(roll)
  }
  function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text='vote' type={vote} />
      <Button text='next anecdote' type={rollClick} />
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[indexOfMax(votes)]}</p>
    </div>
  )
}

export default App