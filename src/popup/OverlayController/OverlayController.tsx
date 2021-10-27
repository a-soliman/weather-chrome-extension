import React from 'react';

import { Grid, IconButton, Paper } from '@material-ui/core';
import { PictureInPicture as PictureInPictureIcon } from '@material-ui/icons';

interface OverlayControllerProps {
  isActive: boolean;
  onToggle: () => void;
}

export const OverlayController: React.FC<OverlayControllerProps> = ({ isActive, onToggle }): JSX.Element => {
  return (
    <Grid item>
      <Paper>
        <IconButton onClick={onToggle}>
          <PictureInPictureIcon />
        </IconButton>
      </Paper>
    </Grid>
  );
};
