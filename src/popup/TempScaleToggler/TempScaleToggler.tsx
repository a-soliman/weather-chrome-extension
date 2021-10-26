import React from 'react';

import { Grid, IconButton, Paper } from '@material-ui/core';
import { OpenWeather } from '../../utils/OpenWeather';

interface TempScaleTogglerProps {
  tempScale: OpenWeather.TempScale;
  onToggle: () => void;
}

const METRIC_UNICODE = '\u2103';
const IMPERIAL_UNICODE = '\u2109';

export const TempScaleToggler: React.FC<TempScaleTogglerProps> = ({ tempScale, onToggle }): JSX.Element => {
  return (
    <Grid item xs={2}>
      <Paper>
        <IconButton onClick={onToggle}>{tempScale === 'metric' ? METRIC_UNICODE : IMPERIAL_UNICODE}</IconButton>
      </Paper>
    </Grid>
  );
};
