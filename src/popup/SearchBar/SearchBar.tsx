import React, { useState } from 'react';

import { Box, Grid, IconButton, InputBase, Paper } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

interface SearchBarProps {
  addClickHandler: (string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  addClickHandler,
}): JSX.Element => {
  const [input, setInput] = useState('');

  function handleInputChange(
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void {
    setInput(evt.target.value);
  }

  function handleAddButtonClick(): void {
    addClickHandler(input);
    setInput('');
  }

  return (
    <Grid container>
      <Grid item={true}>
        <Paper>
          <Box px="15px" py="5px">
            <InputBase
              value={input}
              onChange={handleInputChange}
              placeholder="add a city name"
              fullWidth={true}
            />
            <IconButton onClick={handleAddButtonClick} disabled={input === ''}>
              <AddIcon />
            </IconButton>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
