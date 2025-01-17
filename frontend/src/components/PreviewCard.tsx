import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface PreviewCardProps {
  title: string;
  path: string;
  content: React.ReactNode;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ title, path, content }) => {
  return (
    <div className="card-dashboard">
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{title}</h2>
        <div className="py-2">{content}</div>
        <div className="card-actions justify-end">
          <Link
            to={path}
            className="btn btn-primary btn-sm gap-2"
          >
            View More
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
