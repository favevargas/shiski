import React from 'react';
import TeamMember from '../components/TeamMember';
import '../styles/AboutUs.css';

export default function AboutUsPage() {
  const teamMembers = [
    {
      id: 1,
      name: 'Camila Cáceres',
      role: 'BACKEND DEVELOPER',
      image: 'https://ik.imagekit.io/o5jc4aa7c/Cami.jpg?updatedAt=1755310282453'
    },
    {
      id: 2,
      name: 'Carolina Muñoz',
      role: 'FULLSTACK DEVELOPER',
      image: 'https://ik.imagekit.io/o5jc4aa7c/Caro.jpg?updatedAt=1755310282370'
    },
    {
      id: 3,
      name: 'Fabián Vargas',
      role: 'PRODUCT OWNER',
      image: 'https://ik.imagekit.io/o5jc4aa7c/Fabi.jpg?updatedAt=1755310281836'
    },
    {
      id: 4,
      name: 'Franco Ramírez',
      role: 'FULLSTACK DEVELOPER',
      image: 'https://ik.imagekit.io/o5jc4aa7c/Franco.jpg?updatedAt=1755310282442'
    },
    {
      id: 5,
      name: 'Tamara Escobar',
      role: 'QA',
      image: 'https://ik.imagekit.io/o5jc4aa7c/Tammy.jpg?updatedAt=1755310282287'
    }
  ];

  return (
    <div className="about-us-container">
      <h1 className="about-us-title">NUESTRO EQUIPO</h1>
      
      <div className="team-members-container">
        {teamMembers.map((member, index) => (
          <TeamMember 
            key={member.id}
            name={member.name}
            role={member.role}
            image={member.image}
          />
        ))}
      </div>

      <div className="mission-vision-container">
        <div className="mission-container">
          <h2>MISIÓN</h2>
          <p>
            En Shiski, nuestra misión es transformar la logística en una experiencia accesible y eficiente para todos. Nos comprometemos a proporcionar soluciones innovadoras que simplifiquen los procesos logísticos, permitiendo a nuestros clientes optimizar sus operaciones y alcanzar sus objetivos comerciales con confianza.
          </p>
        </div>
        
        <div className="vision-container">
          <h2>VISIÓN</h2>
          <p>
            Ser la plataforma líder en educación logística a nivel global, reconocida por la excelencia de nuestros cursos y el impacto positivo en la formación de profesionales del sector. Aspiramos a crear un ecosistema donde la innovación y el conocimiento impulsen la evolución de la industria logística hacia un futuro más sostenible y eficiente.
          </p>
        </div>
      </div>
    </div>
  );
}