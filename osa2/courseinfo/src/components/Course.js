const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const initialValue = 0
  const exerciselist = parts.map(part => part.exercises)
  const sum = exerciselist.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  )
  return(
    <p>Number of exercises {sum}</p>
  )
}

const Part = ({ part }) => 
  <li>
    {part.name} {part.exercises}
  </li>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course