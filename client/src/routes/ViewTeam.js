import { React } from "react";
import MainHeader from "../components/header/MainHeader";
import MessageInput from "../components/teams/MessageInput";
import MainLayout from "../layouts/main";
import { Grid } from 'semantic-ui-react';

const ViewTeam = () => (
    <MainLayout
        ChildComponent={
            <div>
                <MainHeader channelName={"general"} />
                <MessageInput channelName={"general"} />
                            <Grid divided='vertically'>
    <Grid.Row columns={2}>
      <Grid.Column>
        aaaaaaaaaaaaaaaaaaaaaaaaaaa
      </Grid.Column>
      <Grid.Column>
        aaaaaaaaaaaaaaaaaaaaaaaaaaa
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={3}>
      <Grid.Column>
        aaaaaaaaaaaaaaaaaaaaaaaaaaa
      </Grid.Column>
      <Grid.Column>
        aaaaaaaaaaaaaaaaaaaaaaaaaaa
      </Grid.Column>
      <Grid.Column>
        aaaaaaaaaaaaaaaaaaaaaaaaaaa
      </Grid.Column>
    </Grid.Row>
  </Grid>
            </div>
        }
    />
);

export default ViewTeam;
