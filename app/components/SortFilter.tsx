'use client'
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Hidden from '@mui/material/Hidden';
import { FilterListTwoTone } from '@mui/icons-material';
import Slider from '@mui/material/Slider';
import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Collapse from '@mui/material/Collapse';

import CircleOfFifths from '../components/CircleOfFifths';

type Anchor = 'bottom';

const SortButton = styled(Button)(({ theme }) => ({
  '&&': {
    minHeight: '4px',
    padding: '0px 10px',
    color: 'white',
    // backgroundColor: 'white',
  },
  '&:hover': {
    backgroundColor: '#00e676',
    color: theme.palette.secondary.contrastText,
  },
}));
const SortFilterButton = styled(Button)(({ theme }) => ({
  '&&': {
    minHeight: '4px',
    padding: '0px 10px',
    color: 'white',
    // backgroundColor: '#0d47a1',
  },
  '&:hover': {
    // backgroundColor: '#00e676',
    color: theme.palette.secondary.contrastText,
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  minHeight: '4px',
  padding: '0px 10px',
  '&.Mui-expanded': {
    minHeight: '4px',
    padding: '0px 10px',
  },
  '& > .MuiAccordionSummary-content': {
    margin: '0',
    '&.Mui-expanded': {
      margin: '0',
    }
  }
}));

const KeyAccordionDetails = styled(AccordionDetails)({
  position: 'absolute',
  zIndex: 2,
  left: '100%',
  transform: 'translateX(-48%)',
  width: '250px',
  height: '280px',
  backdropFilter: 'blur(15px)',
  borderRadius: '1em',
  boxShadow: '0px 6px 10px #0d47a1',
});

const TempoAccordionDetails = styled(AccordionDetails)({
  position: 'absolute',
  zIndex: 2,
  left: '100%',
  transform: 'translateX(-75%)',
  backdropFilter: 'blur(15px)',
  borderRadius: '1em',
  width: '300px',
  boxShadow: '0px 6px 10px #0d47a1',
});

const SortFilter = ({ searchQuery, offset, sortOrder, setSortOrder, sortBy, setSortBy, tempoSelect, setTempoSelect, activeSlice, setActiveSlice }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openKey, setOpenKey] = useState(false);
  const [openTempo, setOpenTempo] = useState(false);
  const [sliderValue, setSliderValue] = useState([80, 140]);
  const [textFieldTempo, setTextFieldTempo] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const keyAccordionRef = useRef(null);
  const bpmAccordionRef = useRef(null);
  const [filterOpen, setFilterOpen] = useState(false);
  //filter effect
  useEffect(() => {
    setActiveSlice(null);
    setTempoSelect([0, 200]);
  }, [offset, searchQuery]);

  //close accordion
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [openAccordion]);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };

  //sorting
  const handleSort = (attribute: "tempo" | "key") => {
    if (sortBy === attribute && sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortBy(attribute);
      setSortOrder("asc");
    }
  };

  //tempo filter
  const valuetext = (value) => {
    return `${value} bpm`;
  }
  const handleTempoSelect = (event, tempo) => {
    setSliderValue(tempo);
  };

  const handleTempoSubmit = (event) => {
    event.preventDefault();

    if (textFieldTempo) {
      setTempoSelect([parseFloat(textFieldTempo), parseFloat(textFieldTempo)]);
    } else {
      setTempoSelect(sliderValue);
    }
  };

  const handleTextFieldChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, '');  // Only allow digits
    setTextFieldTempo(value);
  };
  //reset filter
  const handleReset = (event) => {
    event.preventDefault();  // To prevent the default behavior
    setTempoSelect([0, 200]);
    setSliderValue([80, 140]);
    setTextFieldTempo('');  // Clear the textfield
    setActiveSlice('');
  };
  const handleOutsideClick = (event) => {
    if (keyAccordionRef.current && !keyAccordionRef.current.contains(event.target) && openAccordion === 'keyAccordion') {
      setOpenAccordion(null);
    }

    if (bpmAccordionRef.current && !bpmAccordionRef.current.contains(event.target) && openAccordion === 'bpmAccordion') {
      setOpenAccordion(null);
    }
  };
  const list = () => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
    // onClick={toggleDrawer(false)}
    // onKeyDown={toggleDrawer(false)}
    >
      <List>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpenKey(!openKey)}>
            <ListItemText primary={<Typography fontSize='1rem' color='black'>Filter by: Key</Typography>} />
          </ListItemButton>
          <Collapse in={openKey} timeout="auto" unmountOnExit>
            <Box p={1}>
              <CircleOfFifths activeSlice={activeSlice} setActiveSlice={setActiveSlice} />
            </Box>
          </Collapse>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpenTempo(!openTempo)}>
            <ListItemText primary={<Typography fontSize='1rem' color='black'>Filter by: BPM</Typography>} />
          </ListItemButton>
          <Collapse in={openTempo} timeout="auto" unmountOnExit>
            <Box p={2}>  {/* Add padding if needed */}
              {/* Place your Tempo Component here */}
              <form onSubmit={handleTempoSubmit}>
                <Box sx={{
                  display: 'flex',
                  height: '120px',
                  width: '220px',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <Slider
                    min={0}
                    max={200}
                    getAriaLabel={() => 'Tempo'}
                    value={sliderValue}
                    onChange={handleTempoSelect}
                    valueLabelDisplay="on"
                    getAriaValueText={valuetext}
                  />
                  <TextField
                    value={textFieldTempo}
                    onChange={handleTextFieldChange}
                    id="filled-basic"
                    label="select a range or enter a bpm"
                    variant="filled"
                    autoComplete="off"
                    InputProps={{
                      style: {
                        backgroundColor: '#eceff1',
                      }
                    }}
                  />
                  <Button type="submit" variant="contained"
                    sx={{
                      '&&': {
                        color: 'white',
                        backgroundColor: '#4d97f8',
                        '&:hover': {
                          backgroundColor: '#3746a2',
                        },
                      }
                    }}
                  >
                    Filter Tempo
                  </Button>
                </Box>
              </form>
            </Box>
          </Collapse>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleSort("key")}>
            <ListItemText sx={{
              fontSize: '1rem',
              color: 'black'
            }}>
              Sort by: Key
            </ListItemText>
            {sortBy === "key" && sortOrder === "asc" ? "↑" : "↓"}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleSort("tempo")}>
            <ListItemText sx={{
              fontSize: '1rem',
              color: 'black'
            }}>
              Sort by: BPM
            </ListItemText>
            {sortBy === "tempo" && sortOrder === "asc" ? "↑" : "↓"}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handleReset}>
            <ListItemText primary={<Typography fontSize='1rem' color='black'>Reset</Typography>} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Hidden smDown>
        <Box
          border={1}
          borderColor="grey.500"
          borderRadius={2} m={0} sx={{
            width: '65vw',
            '@media (max-width: 900px)': {
              width: '90vw',
            }
          }}>
          <Grid item container className='py-1' justifyContent='space-between' xs={12} spacing={1}>
            {/*/ filter */}
            <Grid item xs={12} sm={6} container alignItems="center" spacing={1}>
              <Grid item >
                <Typography fontSize='1rem' color='white'>Filter by:</Typography>
              </Grid>
              <Grid item >
                <Accordion
                  ref={keyAccordionRef}
                  expanded={openAccordion === 'keyAccordion'}
                  onChange={() => setOpenAccordion(prev => prev === 'keyAccordion' ? null : 'keyAccordion')}
                >
                  <StyledAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography fontSize='0.8rem' >Key</Typography>
                  </StyledAccordionSummary>

                  <KeyAccordionDetails>
                    <Box>
                      <CircleOfFifths activeSlice={activeSlice} setActiveSlice={setActiveSlice} />
                    </Box>
                  </KeyAccordionDetails>

                </Accordion>
              </Grid>

              <Grid item >
                <Accordion
                  ref={bpmAccordionRef}
                  expanded={openAccordion === 'bpmAccordion'}
                  onChange={() => setOpenAccordion(prev => prev === 'bpmAccordion' ? null : 'bpmAccordion')}
                >
                  <StyledAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography fontSize='0.8rem' >BPM</Typography>
                  </StyledAccordionSummary>
                  <TempoAccordionDetails>
                    <form onSubmit={handleTempoSubmit}>
                      <Box sx={{
                        display: 'flex',
                        height: '200px',
                        width: '270px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                        <Slider
                          min={0}
                          max={200}
                          getAriaLabel={() => 'Tempo'}
                          value={sliderValue}
                          onChange={handleTempoSelect}
                          valueLabelDisplay="on"
                          getAriaValueText={valuetext}
                        />
                        <TextField
                          value={textFieldTempo}
                          onChange={handleTextFieldChange}
                          id="filled-basic"
                          label="select a range or enter a bpm"
                          variant="filled"
                          autoComplete="off"
                          InputProps={{
                            style: {
                              backgroundColor: '#eceff1',
                            }
                          }}
                        />
                        <Button type="submit" variant="contained"
                          sx={{
                            '&&': {
                              color: 'white',
                              backgroundColor: '#4d97f8',
                              '&:hover': {
                                backgroundColor: '#3746a2',
                              },
                            }

                          }}
                        >
                          Filter Tempo
                        </Button>
                      </Box>
                    </form>

                  </TempoAccordionDetails>
                </Accordion>
              </Grid>

              <Grid item paddingLeft={'2px'}>
                <Box
                  onClick={handleReset}
                  variant="contained"
                  color="#ffecb3"
                  sx={{
                    // backgroundColor:'purple',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    width: '50px',
                    height: '24px',

                  }}
                >
                  Reset
                </Box>

              </Grid>
            </Grid>

            {/* sort */}
            <Grid item xs={12} sm={5} container alignItems="center" justifyContent='flex-end' spacing={0} sx={{
              '@media (max-width: 600px)': {
                justifyContent: 'flex-start',
              }
            }}>
              <Grid item> {/* Wrap Typography in a Grid item */}
                <Typography fontSize='1rem' color='white'>Sort by: </Typography>
              </Grid>
              <Grid item > {/* Wrap the SortButton in a Grid item */}
                <SortButton onClick={() => handleSort("key")}>
                  <Typography fontSize='.9rem' sx={{ textTransform: 'none', }}>
                    Key
                  </Typography>
                  {sortBy === "key" && sortOrder === "asc" ? "↑" : "↓"}
                </SortButton>
              </Grid>
              <Grid item> {/* Wrap the next SortButton in a Grid item */}
                <SortButton onClick={() => handleSort("tempo")}>
                  <Typography fontSize='.9rem'>BPM</Typography>
                  {sortBy === "tempo" && sortOrder === "asc" ? "↑" : "↓"}
                </SortButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '86vw'
        }}>
          <SortFilterButton onClick={toggleDrawer(true)}>
            Filter
            <FilterListTwoTone />
          </SortFilterButton>
        </Box>
        <SwipeableDrawer
          anchor="bottom"
          open={isOpen}
          onClose={toggleDrawer(false)}
          swipeAreaWidth={0} // Disables swipe to open
        >
          {list()}
        </SwipeableDrawer>
      </Hidden>
    </div>
  )
}

export default SortFilter;