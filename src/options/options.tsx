import 'fontsource-roboto';
import './options.scss';

import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

import { Box, Button, Card, CardContent, Grid, TextField, Typography, Switch } from '@material-ui/core';

import { getStoredOptions, LocalStorageOptions, setStoredOptions } from '../utils/storage';
import { Messages } from '../utils/messages';

type FormState = 'ready' | 'loading' | 'dirty';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>('loading');

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setFormState('ready');
    });
  }, []);

  const handleHomeCityInputChange = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const updatedOptions = { ...options, homeCity: evt.target.value };
    setOptions(updatedOptions);
    setFormState('dirty');
  };

  const handleOverlayChange = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const updatedOptions = { ...options, overlay: !options.overlay };
    setOptions(updatedOptions);
    setFormState('dirty');
  };

  const handleSaveButtonClick = async (): Promise<void> => {
    setFormState('loading');
    await setStoredOptions(options);
    chrome.runtime.sendMessage(Messages.homeCityUpdated);
    setFormState('ready');
  };

  if (!options) return null;

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home city name</Typography>
              <TextField fullWidth placeholder="Enter a home city name" value={options.homeCity} onChange={handleHomeCityInputChange} />
            </Grid>
            <Grid item>
              <Typography variant="body1">Auto Overlay</Typography>
              <Switch disabled={options.homeCity === ''} checked={options.overlay} onChange={handleOverlayChange} />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" disabled={formState !== 'dirty'} onClick={handleSaveButtonClick}>
                {formState === 'loading' ? 'Saving...' : formState === 'ready' ? 'Saved' : 'Save'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
ReactDom.render(<App />, root);
