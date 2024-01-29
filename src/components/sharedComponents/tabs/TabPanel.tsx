import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index?: number;
  value: number;
  elements: React.ReactNode[];
}

const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, elements, ...rest } = props;

  return (
    <div>
      {elements.map((element, index) => (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...rest}
        >
          {value === index && <div>{element}</div>}
        </div>
      ))}
    </div>
    // <div
    //   role="tabpanel"
    //   hidden={value !== index}
    //   id={`simple-tabpanel-${index}`}
    //   aria-labelledby={`simple-tab-${index}`}
    //   {...rest}
    // >
    //   {value === index && <div>{children}</div>}
    // </div>
  );
};

export default TabPanel;
