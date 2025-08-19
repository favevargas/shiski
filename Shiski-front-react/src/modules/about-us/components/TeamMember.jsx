import React from 'react';

export default function TeamMember({ name, role, image }) {
  return (
    <div className="team-member">
      <div className="member-role">{role}</div>
      <div className="member-image-container">
        <img src={image} alt={name} className="member-image" />
      </div>
    </div>
  );
}