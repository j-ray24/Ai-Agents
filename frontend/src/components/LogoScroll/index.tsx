import React from 'react';

const CompanyLogo: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center justify-center px-8 grayscale hover:grayscale-0 transition-all">
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xl">
          {name.charAt(0)}
        </div>
        <span className="text-gray-800 font-semibold">{name}</span>
      </div>
    </div>
  </div>
);

const LogoScroll: React.FC = () => {
  const companies = [
    'TechFlow',
    'InnovateX',
    'DataSphere',
    'NextGen Solutions',
    'CloudPeak',
    'SmartCore',
    'FutureScale',
    'ByteLogic',
  ];

  return (
    <div className="w-full overflow-hidden bg-gray-50 py-4">
      <div className="flex animate-scroll">
        {/* First set of logos */}
        {companies.map((company, index) => (
          <CompanyLogo key={`first-${index}`} name={company} />
        ))}
        {/* Duplicate set for seamless scrolling */}
        {companies.map((company, index) => (
          <CompanyLogo key={`second-${index}`} name={company} />
        ))}
      </div>
    </div>
  );
};

export default LogoScroll;
