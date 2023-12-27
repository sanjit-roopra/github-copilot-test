import React, { useState } from 'react';
import WorkflowForm from './WorkflowForm';
import WorkflowChart from './WorkflowChart';

function App() {
  const [workflowData, setWorkflowData] = useState(null);

  const handleSubmit = (data) => {
    setWorkflowData(data);
  };

  return (
    <div className="App">
      <WorkflowForm onSubmit={handleSubmit} />
      {workflowData && <WorkflowChart {...workflowData} />}
    </div>
  );
}

export default App;
