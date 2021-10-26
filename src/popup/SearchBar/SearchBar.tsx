import React, { useState } from 'react';

import { Box, Card, Grid, IconButton, InputBase, Paper } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

interface SearchBarProps {
  addClickHandler: (string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ addClickHandler }): JSX.Element => {
  const [input, setInput] = useState('');

  function handleInputChange(evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
    setInput(evt.target.value);
  }

  function handleAddButtonClick(): void {
    addClickHandler(input);
    setInput('');
  }

  return (
    <>
      <Grid item={true} xs={8}>
        <InputBase value={input} onChange={handleInputChange} placeholder="add a city name" fullWidth={true} />
      </Grid>
      <Grid item={true} xs={2}>
        <IconButton onClick={handleAddButtonClick} disabled={input === ''}>
          <AddIcon />
        </IconButton>
      </Grid>
    </>
  );
};
