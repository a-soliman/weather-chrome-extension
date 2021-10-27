import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import './WeatherCard.scss';

interface WeatherCardContainerProps {
  children: React.ReactNode;
  onDelete?: () => void;
}

export const WeatherCardContainer: React.FC<WeatherCardContainerProps> = ({ children, onDelete }) => {
  return (
    <Box mx="4px" my="16px">
      <Card>
        <CardContent>{children}</CardContent>
        {onDelete && (
          <CardActions>
            <Button onClick={onDelete} color="secondary">
              <Typography className="weatherCard-body">Delete</Typography>
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};
