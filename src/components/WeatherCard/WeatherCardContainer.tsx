import React from 'react';

import { Box, Button, Card, CardActions, CardContent } from '@material-ui/core';

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
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};
