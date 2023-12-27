import React, { useState } from 'react';

function WorkflowForm({ onSubmit }) {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [workflow, setWorkflow] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ owner, repo, workflow });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={owner} onChange={e => setOwner(e.target.value)} placeholder="Owner" required />
      <input type="text" value={repo} onChange={e => setRepo(e.target.value)} placeholder="Repo" required />
      <input type="text" value={workflow} onChange={e => setWorkflow(e.target.value)} placeholder="Workflow" required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default WorkflowForm;