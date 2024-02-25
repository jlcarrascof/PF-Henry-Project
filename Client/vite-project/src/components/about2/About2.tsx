// Importa React y otros módulos necesarios
import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa"; // Importa el ícono de LinkedIn
import styles from "./about.module.css";

// Define el componente Button
const Button: React.FC<any> = ({ children, onClick, className }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

// Define las URLs de las imágenes
const FitnessImage1 =
  "https://c4.wallpaperflare.com/wallpaper/714/583/660/fitness-female-body-wallpaper-preview.jpg";

// Define las propiedades del componente AnimatedBox
interface AnimatedBoxProps {
  onClick: () => void;
  children: React.ReactNode;
}

// Define el componente AnimatedBox
const AnimatedBox: React.FC<AnimatedBoxProps> = ({ onClick, children }) => (
  <div className={styles.animatedBox} onClick={onClick}>
    {children}
  </div>
);

// Define las propiedades del componente AnimatedCard
interface AnimatedCardProps {
  backgroundColor?: string;
  children: React.ReactNode;
}

// Define el componente AnimatedCard
const AnimatedCard: React.FC<AnimatedCardProps> = ({
  backgroundColor,
  children,
}) => (
  <div
    className={`${styles.card} ${styles.animatedCard}`}
    style={{ backgroundColor }}
  >
    {children}
  </div>
);

// Define las propiedades del componente IconContainer
interface IconContainerProps {
  children: React.ReactNode;
}

// Define el componente IconContainer
const IconContainer: React.FC<IconContainerProps> = ({ children }) => (
  <div className={styles.iconContainer}>{children}</div>
);

// Define el componente Presentation
const About2: React.FC = () => {
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(
    null
  );
  const teamMembers = [
    {
      name: "Miguel Angel",
      image:
        "https://c4.wallpaperflare.com/wallpaper/622/941/214/jujutsu-kaisen-satoru-gojo-hd-wallpaper-preview.jpg",
      linkedin: "https://github.com/Angelpulgarin369",
    },

    {
      name: "Miguel Angel",
      image:
        "https://c4.wallpaperflare.com/wallpaper/622/941/214/jujutsu-kaisen-satoru-gojo-hd-wallpaper-preview.jpg",
      linkedin: "https://github.com/Angelpulgarin369",
    },

    // Agrega otros miembros del equipo según sea necesario...
  ];

  // Define la función handleDeveloperClick
  const handleDeveloperClick = (developerName: string) => {
    setSelectedDeveloper(
      selectedDeveloper === developerName ? null : developerName
    );
  };

  // Define la función handleButtonClick
  const handleButtonClick = () => {
    window.open(
      "https://www.mheducation.es/bcv/guide/capitulo/844814645X.pdf",
      "_blank"
    );
  };

  // Renderiza el contenido JSX del componente Presentation
  return (
    <div>
      <div className={styles.flexContainer}>{/* ... */}</div>

      <h1 className={styles.heading}>🆆🅴🅻🅲🅾🅼🅴 🆃🅾 🆁🅴🅽🆃🅸🅵🆈</h1>
      {/* ... */}
      <div className={styles.cardContainer}>
        <AnimatedBox onClick={() => handleDeveloperClick("AboutUs")}>
          <IconContainer>
            {/* Set the size of the image */}
            <img
              src={FitnessImage1}
              alt="About Us"
              className={`${styles.image} ${styles.aboutUsImage}`}
              style={{ width: "300px", height: "200px" }}
            />
          </IconContainer>
          <h4 className={styles.cardTitle}>About Us</h4>
          {selectedDeveloper === "AboutUs" && (
            <AnimatedCard>
              <div className={styles.cardContent}>
                <p>
                  Somos un equipo apasionado de entusiastas del fitness
                  comprometidos a proporcionar herramientas y recursos para
                  ayudarte a alcanzar tus metas de acondicionamiento físico.
                </p>
                {/* Agrega las tarjetas de información de los integrantes del equipo */}
                {teamMembers.map((member, index) => (
                  <div key={index}>
                    <h5>{member.name}</h5>
                    <img
                      src={member.image}
                      alt={`Photo of ${member.name}`}
                      className={`${styles.smallImage} ${styles.teamMemberImage}`}
                    />
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                ))}
                {/* Puedes agregar más información sobre tu equipo o filosofía aquí */}
              </div>
            </AnimatedCard>
          )}
        </AnimatedBox>

        {/* Card de App Information */}
        <AnimatedBox onClick={() => handleDeveloperClick("AppInformation")}>
          <IconContainer>
            {/* Replace "URL_APP_IMAGE" with the correct URL for the image */}
            <img
              src="https://c0.wallpaperflare.com/preview/33/202/452/neon-street-neon-light-street-view.jpg"
              alt="App Information"
              className={`${styles.image} ${styles.appInfoImage}`}
              style={{ width: "300px", height: "200px" }}
            />
          </IconContainer>
          <h4 className={styles.cardTitle}>App Information</h4>
          {selectedDeveloper === "AppInformation" && (
            <AnimatedCard>
              <div className={styles.cardContent}>
                <p>
                  Welcome to Rentify - Your Temporary Rental Platform! Discover
                  and Rent: Explore a wide range of properties for temporary
                  rental, from cozy homes to modern commercial spaces and
                  offices. For Users: Find your perfect place with Rentify.
                  Search, compare, and securely book properties. Create your
                  profile and share reviews to contribute to our community. For
                  Property Owners: Optimize the management of your properties.
                  Register, update availability, and monitor bookings
                  efficiently. Access a complete history and maximize your
                  earnings with Rentify. Personalized Experience: Create your
                  profile, filter properties based on your preferences, and save
                  your favorites for easy comparison. Book securely with our
                  integrated payment gateways. Transparent Reviews: After your
                  stay, share your experience through reviews. We provide
                  transparent feedback to improve the Rentify community. Quality
                  Assurance: Rentify is committed to providing reliable service.
                  We implement measures to resolve any issues and ensure the
                  satisfaction of both property owners and users.
                </p>
                {/* Puedes agregar más información sobre las características de tu aplicación aquí */}
              </div>
            </AnimatedCard>
          )}
        </AnimatedBox>

        {/* Repite la estructura similar para otros componentes AnimatedBox */}
      </div>
      {/* ... */}
      {/* Utiliza el componente Button */}
      <Button className={styles.button} onClick={handleButtonClick}>
        <h6 className={styles.buttonText}>Click here!</h6>
        <p className={styles.buttonText}>
          If you want more specific information about our App
        </p>
      </Button>
    </div>
  );
};

// Exporta el componente Presentation
export default About2;
