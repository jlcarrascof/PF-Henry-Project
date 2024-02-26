import React from "react";
import './teamMember.css'
interface TeamMemberProps {
  name: string;
  linkedin: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, linkedin, image }) => {
  return (
    <div className="team-member">
      
      <a href={linkedin} target="_blank" rel="noopener noreferrer">
        <img className="fotoNuestra" src={image} alt={name} />
      </a>
      <h3>{name}</h3>
     
      
      <a href={linkedin} target="_blank" rel="noopener noreferrer">
        <img className='iconoLinkedin'
          alt="svgImg"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCI+CiAgICA8cGF0aCBkPSJNNDEsNEg5QzYuMjQsNCw0LDYuMjQsNCw5djMyYzAsMi43NiwyLjI0LDUsNSw1aDMyYzIuNzYsMCw1LTIuMjQsNS01VjlDNDYsNi4yNCw0My43Niw0LDQxLDR6IE0xNywyMHYxOWgtNlYyMEgxN3ogTTExLDE0LjQ3YzAtMS40LDEuMi0yLjQ3LDMtMi40N3MyLjkzLDEuMDcsMywyLjQ3YzAsMS40LTEuMTIsMi41My0zLDIuNTNDMTIuMiwxNywxMSwxNS44NywxMSwxNC40N3ogTTM5LDM5aC02YzAsMCwwLTkuMjYsMC0xMCBjMC0yLTEtNC0zLjUtNC4wNGgtMC4wOEMyNywyNC45NiwyNiwyNy4wMiwyNiwyOWMwLDAuOTEsMCwxMCwwLDEwaC02VjIwaDZ2Mi41NmMwLDAsMS45My0yLjU2LDUuODEtMi41NiBjMy45NywwLDcuMTksMi43Myw3LjE5LDguMjZWMzl6Ij48L3BhdGg+Cjwvc3ZnPg=="
        /> 
      </a>

    </div>
  );
};

export default TeamMember;
