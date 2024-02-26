import React from "react";
import TeamMember from "./TeamMember";
import "./about.css";

interface TeamMemberProps {
  name: string;
  linkedin: string;
  image: string;
}

const teamMembers: TeamMemberProps[] = [
  {
    name: "Diego Arturo Quevedo",
    linkedin: "https://www.linkedin.com/in/diego-arturo-quevedo-ramirez-2bb197281/",
    image: "../../images/Diego-photo.jpg",
  },
  {
    name: "Micaela Diana Solórzano",
    linkedin: "https://www.linkedin.com/in/micaela-diana-solórzano-09a588297/",
    image: "../../../images/Mica-photo.jpeg",
  },
  {
    name: "Nazareth Villar",
    linkedin: "https://www.linkedin.com/in/javier-jesus-martinez-fari%C3%B1as-b71b3968/",
    image: "../../../images/Naza-photo.jpg",
  },
  {
    name: "Alejandra Foliaco",
    linkedin: "https://www.linkedin.com/in/alejandra-foliaco-ramos-a74137278/",
    image: "../../../images/Aleja-photo.png",
  },
  {
    name: "Javier Jesus Martinez",
    linkedin: "https://www.linkedin.com/in/javier-jesus-martinez-fari%C3%B1as-b71b3968/",
    image: "../../../images/Javi-photo.jpg",
  },
  {
    name: "Rigoberto Maximiliano",
    linkedin: "https://www.linkedin.com/in/rigoberto-martinez-quintana-a954787b/",
    image: "../../../images/Rigo-photo.jpg",
  },
  {
    name: "Agustin Racca",
    linkedin: "https://www.linkedin.com/in/agustin-racca-799414271/",
    image: "../../../images/Agus-photo.jpeg",
  },
];

const About: React.FC = () => {
  return (
    <div className="About">
      <div className="container">
        <div className="mision-vision">
          <h1>Welcome to Rentify - Your Temporary Rental Platform!</h1>
          <div className="img-mision">
            <p>
              <h2> Discover and Rent: </h2> 
              Explore a wide range of properties for
              temporary rental, from cozy homes to modern commercial spaces and
              offices.
            </p>
            <img src="../../../images/en-renta.png"/>

          </div>
          <div className="img-vision">
            <img src="../../../images/avatar.png"/>
            <p>
              <h2>For Users:</h2>
              Find your perfect place with Rentify. Search, compare,
              and securely book properties. Create your profile and share
              reviews to contribute to our community.
            </p>
          </div>

          <div className="img-mision">
            <p>
            <h2>For Property Owners:</h2>
               Optimize the management of your properties.
              Register, update availability, and monitor bookings efficiently.
              Access a complete history and maximize your earnings with Rentify.
            </p>
            <img src="../../../images/propietario.png" />
          </div>
        </div>
      </div>

      <div className="Linkedin-container">
        <h1>Nuestro Equipo</h1>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
