import React from 'react';
import { CoursePart } from '../types';

const Title = ({ name, exerciseCount }: { name: string, exerciseCount: number }) => (
  <strong>
    {name} {exerciseCount} 
    <br />
  </strong> 
);

const Description = ({ d}: { d: string }) => (
  <i>{d}</i>
);

const Part = ({ coursePart }: { coursePart: CoursePart}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled union member: ${JSON.stringify(value)}`
    );
  };

  switch (coursePart.type) {

  case "normal":
    return (
      <p>
        <Title name={coursePart.name} exerciseCount={coursePart.exerciseCount} />
        <Description d={coursePart.description} />
      </p>
    );

  case "groupProject":
    return (
      <p>
        <Title name={coursePart.name} exerciseCount={coursePart.exerciseCount} />
        project exercises {coursePart.groupProjectCount}
      </p>
    );

  case "submission":
    return (
      <p>
        <Title name={coursePart.name} exerciseCount={coursePart.exerciseCount} />
        <Description d={coursePart.description} />
        <br />
        submit to {coursePart.exerciseSubmissionLink}
      </p>
    );

  case "special":
    return (
      <p>
        <Title name={coursePart.name} exerciseCount={coursePart.exerciseCount} />
        <Description d={coursePart.description} />
        <br />
        required skills: {coursePart.requirements.map((skill, i) => (
          <span key={i}>{skill} </span>
        ))}
      </p>
    );

  default:
    return assertNever(coursePart);
  }
};

export default Part;