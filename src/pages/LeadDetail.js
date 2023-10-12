import { Box, Button, Typography, useTheme, Modal, Grid, Card, List, ListItem, TextField, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../theme";
import Header from "../components/headers/Header";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import OpenAI from 'openai';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LoadingSpin from "react-loading-spin";





const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const fetchData = async ( chatQuestion ) => {
    
    try {
        const answer = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: chatQuestion }],

        });
        console.log(answer.choices[0].message.content, "ans")
        const text = answer.choices[0].message.content
        return text;

    } catch (error) {

        console.log(error)
    }
};
const LeadDetail = () => {
    const [completedCode, setCompletedCode] = useState("");

    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState("");
    const [chatQuest, setChatQuest] = useState("")
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { leads } = useSelector((state) => state.leads);
    const { id } = useParams()
    let lead = leads.find(lead => lead._id == id)
    const [openModal, setOpenModal] = useState(false);


    useEffect(() =>{
        if(question){
            setChatQuest(question)
    }
        else{

            setChatQuest(`Write cold mail for company ${lead.customer.company_name}  about lead ${lead.lead_name} with description ${lead.description} `)
       
        }
    },[question])


    
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

  const handleQuestionChange =(e) =>{
    setQuestion(e.target.value)
  }
    async function handleClick(e) {
        e.preventDefault()
        try {
            
            setLoading(true);

            const text = await fetchData(chatQuest );

            setLoading(false);

            for (let i = 0; i < (text || "").length; i++) {
                setTimeout(() => {
                    setCompletedCode(text.slice(0, i + 1));
                }, i * 50);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box m="20px" >
            <Header title="Lead Details" subTitle="Managing the sales lead" />

            <Box
                m="40px 0 0 0"

                display="flex" justifyContent=""

            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                        <Card>
                            {lead.messages && lead.messages.map((l, index) => (

                                <>
                                    <hr />
                                    <Typography>Sender: {l.sender}</Typography>
                                    <Typography>Body: {l.body}</Typography>
                                    <Typography>Time: {l.timestamp}</Typography> </>

                            ))}
                        </Card>
                        <Modal open={openModal} onClose={handleCloseModal} sx={{
                            '& .MuiModal-backdrop': {
                                backgroundColor: colors.primary[600],

                            },
                        }}>
                            <Paper sx={{
                                position: "absolute",
                                top: "2%",
                                left: "20%",
                                bottom: "2%",
                                transform: "translate(-50 , -50%)",
                                width: "70%",
                                p: 3,
                                overflowY: "scroll"

                            }}>
                                <h1><SmartToyIcon />{lead.lead_name}</h1>

                                <TextField

                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    placeholder="Enter Your Question"
                                    sx={{ mb: 2 }}
                                    value={question}
                                    onChange={handleQuestionChange}

                                />
                                <TextField

                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={lead.description}

                                />

                                <Button variant="contained" color="success" onClick={handleClick}>
                                    ASK
                                </Button>

                                {loading && <Box sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    mt: 3
                                }} >
                                    <p >Hang on while we get the working for you!</p>
                                    <LoadingSpin primaryColor="#ffffff" numberOfRotationsInAnimation={2} size='30px' />
                                </Box>}
                                {completedCode && (
                                    <Box sx={{
                                        color: colors.greenAccent[300],
                                        ml: "10px",
                                    }} >
                                        <pre>{completedCode}</pre>
                                    </Box>
                                )}
                            </Paper>
                        </Modal>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Card>
                            <h2>Lead Base Data</h2>
                            <List>
                                <ListItem>Company:     <Typography variant="h4"
                                    sx={{
                                        color: colors.greenAccent[300],
                                        ml: "10px",
                                    }}
                                >
                                    {lead.customer.company_name}
                                </Typography>
                                </ListItem>
                                <ListItem>Person: <Typography variant="h4"
                                    sx={{
                                        color: colors.greenAccent[300],
                                        ml: "10px",
                                    }}
                                >
                                    {lead.customer.full_name}
                                </Typography></ListItem>
                                <ListItem>Contact Detail:  <Typography variant="h4"
                                    sx={{
                                        color: colors.greenAccent[300],
                                        ml: "10px",
                                    }}
                                >
                                    {lead.customer.email}
                                </Typography></ListItem>
                                <ListItem>Status:  <Typography variant="h4"
                                    sx={{
                                        color: colors.greenAccent[300],
                                        ml: "10px",
                                    }}
                                >
                                    {lead.status}
                                </Typography></ListItem>
                                <ListItem>Date Start:  <Typography variant="h3"
                                    sx={{
                                        color: colors.grey[300],
                                        ml: "10px",
                                    }}
                                >
                                    {lead.createdAt}
                                </Typography></ListItem>

                                <ListItem>Company URL:  <Typography variant="h3"
                                    sx={{
                                        color: colors.blueAccent[300],
                                        ml: "10px",
                                    }}
                                >
                                    {lead.customer.company_website}
                                </Typography></ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box
                m="40px 0 0 0"

                display="flex" justifyContent=""

            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column">

                            <Box>
                                <Box fontSize="1.5rem">Description</Box>
                                <Box fontSize="1rem">{lead.description}</Box>
                            </Box>

                            <Box padding="1rem">

                                <Box display="flex" justifyContent="space-between">
                                    <Box>

                                        <Button variant="contained" color="success" size="large" onClick={handleOpenModal}>
                                            Ask A.I.
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button variant="contained" color="info" size="large">Get More Data</Button>

                                    </Box>
                                    <Box>
                                        <Button variant="contained" color="secondary" size="large">Clear</Button>

                                    </Box>
                                    <Box>
                                        <Button variant="contained" color="warning" size="large">Schedule</Button>

                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h2>External Links</h2>
                        <List>
                            <ListItem><a href="#">Link 1</a></ListItem>
                            <ListItem><a href="#">Link 2</a></ListItem>
                            <ListItem><a href="#">Link 3</a></ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    );
};

export default LeadDetail;