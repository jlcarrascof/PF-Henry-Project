import React from "react";
import TeamMember from "./TeamMember";
import "./about.module.css";
import Turista from "../../../images/about_img/person-medium-light-skin-tone-white-hair-svgrepo-com.svg";
import Hotel from "../../../images/about_img/hotel-sign-svgrepo-com.svg";

const svgHotel = Hotel;
const svgTurista = Turista;

interface TeamMemberProps {
  name: string;
  linkedin: string;
  image: string;
}

const teamMembers: TeamMemberProps[] = [
  {
    name: "Diego Quevedo",
    linkedin: "www.linkedin.com/in/diego-arturo-quevedo-ramirez-2bb197281",
    image: "../../images/Diego-photo.jpg",
  },
  {
    name: "Micaela Solórzano",
    linkedin: "https://www.linkedin.com/in/micaela-diana-solórzano-09a588297/",
    image: "../../../images/Mica-photo.jpeg",
  },
  {
    name: "Alejandra Foliaco",
    linkedin: "https://www.linkedin.com/in/alejandra-foliaco-ramos-a74137278/",
    image: "../../../images/billetera.png",
  },
];

const About: React.FC = () => {
  return (
    <div className="About">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 text-center">
            <h2>Welcome to Rentify - Your Temporary Rental Platform!</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="text-center">
              <img src="data:image/png;base64,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" className="img-fluid" alt="Rentify Logo" />
            </div>
            <div className="text-justify">
              <p>
                Discover and Rent: Explore a wide range of properties for temporary rental, from cozy homes to modern commercial spaces and offices.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="padre">
              <div className="card card-body">
                <img className="estilo-profile" src={svgTurista} alt="logo tourist" />
                <p className="text-center">
                  For Users: Find your perfect place with Rentify. Search, compare,
                  and securely book properties. Create your profile and share
                  reviews to contribute to our community.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="padre2">
              <div className="card card-body">
                <img className="estilo-profile" src={svgHotel} alt="logo Hotel" />
                <p className="text-center">
                  For Property Owners: Optimize the management of your properties.
                  Register, update availability, and monitor bookings efficiently.
                  Access a complete history and maximize your earnings with Rentify.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="text-center mb-5"><strong>Our Team</strong></h2>
          </div>
        </div>
        <div className="row">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <img src={member.image} className="card-img-top" alt={member.name} />
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <a href={member.linkedin} className="btn btn-primary" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;