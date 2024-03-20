import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CatsItemsListProps } from "../../types/cat.types";

export default function CatsItemsList({ data }: CatsItemsListProps) {
  if(!data || Object.keys(data).length === 0){
    return <Typography
      sx={{ display: "inline" }}
      component="span"
      variant="body2"
      color="text.primary"
      data-testid="error-typography"
    >
      Sorry no data found currently
    </Typography>
  }
  const error_fact = "No Fact Found";
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>T</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={data.fact || error_fact}
          data-testid="typography-length-wrapper"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
                data-testid="typography-length"
              >
                Length
              </Typography>
              {` — ${data.length || 0}`}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}
