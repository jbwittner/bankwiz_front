import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';

function App() {
  const [nom, setNom] = useState('');

  const handleNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNom(event.target.value);
  };

  return (
    <div style={{ padding: '16px' }}>
      <TextField label="Nom" value={nom} onChange={handleNomChange} />
      <Typography variant="h5" component="h1" style={{ marginTop: '16px' }}>
        Bonjour {nom} !
      </Typography>
    </div>
  );
}

export default App;
