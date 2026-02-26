import * as React from "react";
import Typography from "@mui/material/Typography";
import { PageContainer } from "@toolpad/core";
import { Card, CardContent, Grid } from "@mui/material";

export default function DashboardPage() {
  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="caption">Temperature</Typography>
              <Typography variant="h4">24°C</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="caption">Precipitation</Typography>
              <Typography variant="h4">5%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="caption">Wind</Typography>
              <Typography variant="h4">18km/h</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
