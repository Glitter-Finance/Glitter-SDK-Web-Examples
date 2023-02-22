import {Box, Card, CardContent, CardHeader, Stack, Typography} from "@mui/material";
import Item from "../Item";
import React from "react";

function Wallets() {
  return(
    <Card className="basis-card-layout">
      <CardHeader className="basic-card-header basic-card-header-typo" title="Connect Wallets"/>
      <CardContent>
        <Stack>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <img src="/phantom.png" className="input-image"/>
              <Typography>
                {"4iVQ242Ck7azm9bu8HapFt7qZzkW6bKVXb3cXhK6vfEj".slice(0, 20)}...
              </Typography>
            </Box>
          </Item>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <img src="/phantom.png" className="input-image"/>
              <Typography>
                {"4iVQ242Ck7azm9bu8HapFt7qZzkW6bKVXb3cXhK6vfEj".slice(0, 20)}...
              </Typography>
            </Box>
          </Item>
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <img src="/solflare.png" className="input-image"/>
              <Typography>
                {"4iVQ242Ck7azm9bu8HapFt7qZzkW6bKVXb3cXhK6vfEj".slice(0, 20)}...
              </Typography>
            </Box>
          </Item>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Wallets;
