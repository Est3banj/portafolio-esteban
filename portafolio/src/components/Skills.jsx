import React from "react";
import "./Skills.css";

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <h2>Mis Habilidades</h2>

      <div className="skills-container">
        <div className="skill-card">JavaScript</div>
        <div className="skill-card">React</div>
        <div className="skill-card">Node.js</div>
        <div className="skill-card">CSS</div>
        <div className="skill-card">HTML</div>
        <div className="skill-card">Git</div>
      </div>
    </section>
  );
};

export default Skills;
