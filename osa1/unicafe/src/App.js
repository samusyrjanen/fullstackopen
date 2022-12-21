import { useState } from 'react'

const Statistics = (props) => {
  if (props.sum === 0) {
    return (
      <div>
        <h2>statistics</h2>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='sum' value={props.sum} />
          <StatisticLine text='average' value={props.average.toFixed(1)} />
          <StatisticLine text='positive' value={props.portion.toFixed(1)} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({text, type}) => {
  return (
    <button onClick={type}>
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [sum, setSum] = useState(0)
  const [portion, setPortion] = useState(0)

  const goodClick = () => {
    setGood(good+1)
    setSum(good+neutral+bad+1)
    setAverage(((good+1)*1+bad*(-1))/(good+neutral+bad+1))
    setPortion((good+1)/(good+neutral+bad+1)*100)
  }
  const neutralClick = () => {
    setNeutral(neutral+1)
    setSum(good+neutral+bad+1)
    setAverage((good*1+bad*(-1))/(good+neutral+bad+1))
    setPortion(good/(good+neutral+bad+1)*100)
  }
  const badClick = () => {
    setBad(bad+1)
    setSum(good+neutral+bad+1)
    setAverage((good*1+(bad+1)*(-1))/(good+neutral+bad+1))
    setPortion(good/(good+neutral+bad+1)*100)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button text='good' type={goodClick} />
      <Button text='neutral' type={neutralClick} />
      <Button text='bad' type={badClick} />
      <Statistics good={good} neutral={neutral} bad={bad} sum={sum} average={average} portion={portion} />
    </div>
  )
}

export default App
