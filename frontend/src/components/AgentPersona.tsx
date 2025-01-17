import React from 'react';

interface AgentPersonaProps {
  name: string;
  role: string;
  avatarUrl: string;
}

const AgentPersona: React.FC<AgentPersonaProps> = ({ name, role, avatarUrl }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="avatar">
        <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={avatarUrl} alt={`${name} avatar`} />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600">{role}</p>
      </div>
    </div>
  );
};

export default AgentPersona;
