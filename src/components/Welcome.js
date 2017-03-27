import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, Button } from 'react-mdl'

const Welcome = ({ handleCloseDialog, openDialog }) => (
        <Dialog open={openDialog} style={{'width':'600px'}}>
          <DialogTitle>Welcome</DialogTitle>
          <DialogContent>
            <p>Welcome to the Digital River Shannon table tennis league. This is a ranking table based on a points exchange system. There are more points available for a win against a stronger opponent.</p>
            <p>It's up to you to add your games and up to you to be honest. To add a game just click on two names, click the "+ New Match" button and fill out the result. The "Head 2 Head" button will show you score between the two selected players. Happy Ping Ponging!</p>
          </DialogContent>
          <DialogActions>
          	<Checkbox label="Don't show again" ripple defaultChecked />
            <Button type='button' onClick={handleCloseDialog}>Ok</Button>
          </DialogActions>
        </Dialog>
)

export default Welcome