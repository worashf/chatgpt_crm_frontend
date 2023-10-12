
import {
    Box, Typography, useTheme, Button, Checkbox, Dialog, DialogActions, DialogContent, Step, Stepper, StepButton,
    DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField
  } from "@mui/material";
  import FormControlContext from "@mui/material/FormControl/FormControlContext";
  import CloseIcon from "@mui/icons-material/Close"
  import { DataGrid } from "@mui/x-data-grid";
  import DeleteIcon from '@mui/icons-material/Delete';
  import MessageIcon from '@mui/icons-material/Message';
  import ScheduleIcon from '@mui/icons-material/Schedule';
  import MoreVertIcon from '@mui/icons-material/MoreVert';
  import { tokens } from "../theme";
  import Header from "../components/headers/Header";
  import { useSelector } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
  import React, { useState } from "react";
  import AddIcon from '@mui/icons-material/Add';
  
  
  const steps = ['Add Customer Information', 'Add Lead Info'];
  
  const Customer = () => {
    const [open, openchange] = useState(false);
  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { customers } = useSelector((state) => state.customers);
    const [text, setText] = useState("");
    const modifiedCustomers = customers.map((customer) => {
      return {
        ...customer,
        id: customer._id,

      };
    });
  
    const navigate = useNavigate();
  
    const handleRowClick = (row) => {
      navigate(`/leads/${row.id}`);
    };
    const functionopenpopup = () => {
      openchange(true);
    }
    const closepopup = () => {
      openchange(false);
    }
  
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
  
    const totalSteps = () => {
      return steps.length;
    };
  
    const completedSteps = () => {
      return Object.keys(completed).length;
    };
  
    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };
  
    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };
  
    const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ?
          steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStep = (step) => () => {
      setActiveStep(step);
    };
  
    const handleComplete = () => {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
    };
  
  
  
    const columns = [
  
      { field: '_id', headerName: 'ID' },
      { field: 'full_name', headerName: 'Full Name',      flex:1},
      {
        field: 'email', headerName: 'Email',
   
      },
      {
        field: 'phone', headerName: 'Phone',
  
      },
      {
        field: 'company_name', headerName: 'Company Name', headerAlign: "left",
        align: "left",
      },
      {
        field: "Action",
        headerName: "Action",
        flex: 1,
        renderCell: ({ row: { access } }) => {
          return (
            <>
            
           
              <Box
                width="100%"
                m="0 auto "
                padding="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                  colors.greenAccent[600]
  
                }
                borderRadius="4px"
              >
                {<MoreVertIcon />}
  
                <Typography
                  sx={{
                    color: colors.grey[100],
                    ml: "5px",
                  }}
                >
                  {" "}
                  MoreVert
                </Typography>
              </Box>
  
            </>
          );
        },
      },
    ];
  
  
  
    return (
      <Box m="20px" >
        <Header title="Customer" subTitle="Managing Customers" />
        <hr />
        <Button  variant="contained" color="success" size="large" startIcon={<AddIcon />}>Add Customer</Button>
        <div style={{ textAlign: 'center' }}>
  
  
          <Dialog
            // fullScreen 
            open={open} onClose={closepopup} fullWidth maxWidth="sm">
  
            <DialogTitle>   <IconButton onClick={closepopup} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton>   <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>  </DialogTitle>
            <DialogContent>
              {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
              {steps.map((label, index) => (index == 1 ? (
  
                 <Stack spacing={2} margin={2}>
                  <TextField variant="outlined" label="Username"></TextField>
                  <TextField variant="outlined" label="Password"></TextField>
                  <TextField variant="outlined" label="Email"></TextField>
                  <TextField variant="outlined" label="Phone"></TextField>
                  <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
                  <Button color="primary" variant="contained">Submit</Button>
                </Stack>)
  
                : (
                  <>Hello </>
                )))}
  
            </DialogContent>
            <DialogActions>
              {/* <Button color="success" variant="contained">Yes</Button>
                      <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
            </DialogActions>
          </Dialog>
        </div>
        <Box
          m="10px 0 0 0"
          sx={{
            "& .MuiDataGrid-root": {
  
              overflowY: "auto",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "#111",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#cdd4cf",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#ebf5ee",
            },
            "& .MuiDataGrid-footerContainer": {
  
              backgroundColor: "#cdd4cf",
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
  
          }}
        >
          <DataGrid rows={modifiedCustomers} columns={columns}  />
        </Box>
      </Box>
    );
  };
  
  export default Customer;