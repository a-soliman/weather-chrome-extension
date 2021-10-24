import React from 'react';

import {
  Box,
  Card,
  CardContent,
} from '@material-ui/core';

interface WeatherCardContainerProps {
  children: React.ReactNode;
}

export const WeatherCardContainer: React.FC<WeatherCardContainerProps> = ({
  children,
}) => {
  return (
    <Box mx="4px" my="16px">
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};
