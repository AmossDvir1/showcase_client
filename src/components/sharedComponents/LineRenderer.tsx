import React from 'react';
import { splitStringToLines } from '../../utils/utils';

interface LineRendererProps {
    text?: string;
  }

const LineRenderer: React.FC<LineRendererProps> = ({ text="" }) => {
    const lines = splitStringToLines(text);
  
    return (
      <div>
        {lines?.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    );
  };
  
  export default LineRenderer;