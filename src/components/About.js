import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from 'react-mdl'

const About = ({ handleCloseDialog, openDialog }) => (
  
        <Dialog open={openDialog} >
          <DialogTitle>About DR Table Tennis</DialogTitle>
          <DialogContent>
            <p>This is just a bit of fun. If you find any bugs or have any issues, under no circumstances contact Phil at pahern@digitalriver.com</p>
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={handleCloseDialog}>Ok</Button>
          </DialogActions>
        </Dialog>
)

export default About