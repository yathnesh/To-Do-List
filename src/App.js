import React, { useState, useEffect, useRef } from 'react';
import Tabs from './Tabs';
import { TextField, Button, Container, Typography, Box, Grid, Switch, CssBaseline, IconButton, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles/index.js';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskGroup, setTaskGroup] = useState('Work');
  const [taskGroups, setTaskGroups] = useState(['Work', 'Personal']);
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);  // For menu anchor
  const [selectedGroupForMenu, setSelectedGroupForMenu] = useState(null);  // Store selected group for menu
  const [showTaskGroupPopup, setShowTaskGroupPopup] = useState(false);  // For showing task group popup

  // Reference to the menu to detect click outside
  const menuRef = useRef(null);

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim() !== '' && taskGroup.trim() !== '') {
      const task = {
        id: tasks.length + 1,
        name: newTask,
        group: taskGroup,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  // Function to mark a task as completed
  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to handle editing a task
  const handleEditTask = (id, newName) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);
  };

  // Function to handle deleting a task
  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  // Handle menu open and close
  const handleMenuClick = (event, group) => {
    setAnchorEl(event.currentTarget);
    setSelectedGroupForMenu(group);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedGroupForMenu(null);  // Reset the selected group after closing the menu
  };

  // Handle rename and delete task group
  const handleRenameGroup = () => {
    const newGroupName = prompt('Enter new name for the group:', selectedGroupForMenu);
    if (newGroupName && newGroupName !== selectedGroupForMenu) {
      setTaskGroups((prevGroups) => prevGroups.map((group) =>
        group === selectedGroupForMenu ? newGroupName : group
      ));
      handleMenuClose();  // Close the menu after renaming
    }
  };

  const handleDeleteGroup = () => {
    setTaskGroups((prevGroups) => prevGroups.filter((group) => group !== selectedGroupForMenu));
    handleMenuClose();  // Close the menu after deleting
  };

  // Toggle dark mode
  const handleThemeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Create theme based on darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#d32f2f',
      },
    },
  });

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleMenuClose(); // Close the menu if click is outside
      }
    };

    // Add event listener for clicks outside
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Styles for buttons based on dark mode and light mode
  const buttonStyles = {
    showTaskGroupButton: {
      backgroundColor: darkMode ? '#FFFFFF' : '#000000',
      color: darkMode ? '#000000' : '#FFFFFF',
      '&:hover': {
        backgroundColor: darkMode ? '#000000' : '#FFFFFF', // Invert colors on hover
        color: darkMode ? '#FFFFFF' : '#000000', // Invert text color on hover
      },
    },
    addTaskButton: {
      backgroundColor: darkMode ? '#FFFFFF' : '#000000',
      color: darkMode ? '#000000' : '#FFFFFF',
      '&:hover': {
        backgroundColor: darkMode ? '#000000' : '#FFFFFF', // Invert colors on hover
        color: darkMode ? '#FFFFFF' : '#000000', // Invert text color on hover
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This ensures the theme is applied globally */}
      <Container style={{ paddingTop: '20px' }}>
        <Typography variant="h3" align="center" gutterBottom>
          To-Do List
        </Typography>

        {/* Theme Toggle */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Typography>Dark Mode</Typography>
          <Switch checked={darkMode} onChange={handleThemeToggle} />
        </Box>

        {/* Show Task Groups Button */}
        <Box mb={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            sx={buttonStyles.showTaskGroupButton}
            onClick={() => setShowTaskGroupPopup(true)}  // Show the Task Groups Popup
          >
            Show Task Groups
          </Button>
        </Box>

        {/* Task Group Tabs */}
        <Tabs
          groups={taskGroups}
          selectedGroup={taskGroup}
          setSelectedGroup={setTaskGroup}
        />

        {/* Task Input */}
        {taskGroup && (
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="New Task"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={buttonStyles.addTaskButton}
                  onClick={handleAddTask}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Display Tasks for Selected Group */}
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
          {tasks
            .filter((task) => task.group === taskGroup)
            .map((task) => (
              <li key={task.id} style={{ marginBottom: '10px' }}>
                <Box
                  p={2}
                  border={1}
                  borderRadius={2}
                  borderColor="grey.300"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bgcolor={task.completed ? 'success.light' : 'grey.100'}
                  onClick={() => handleCompleteTask(task.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: darkMode ? 'black' : 'inherit', // Ensure black text in dark mode
                    }}
                  >
                    {task.name}
                  </Typography>
                  <Box>
                    <Button
                      variant="text"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newTaskName = prompt('Edit Task:', task.name);
                        if (newTaskName) {
                          handleEditTask(task.id, newTaskName);
                        }
                      }}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'lightblue', // Light blue on hover for Edit button
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="text"
                      color="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(task.id);
                      }}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#dc3545', // Red on hover for Delete button
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </li>
            ))}
        </ul>

        {/* Task Group Popup */}
        <Dialog open={showTaskGroupPopup} onClose={() => setShowTaskGroupPopup(false)}>
          <DialogTitle>Task Groups</DialogTitle>
          <DialogContent>
            {taskGroups.map((group) => (
              <Box key={group} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6">{group}</Typography>
                <IconButton onClick={(e) => handleMenuClick(e, group)} ref={menuRef}>
                  <MoreVertIcon />
                </IconButton>

                {/* Menu for Rename, Delete Group */}
                <Menu
                  anchorEl={anchorEl}
                  open={selectedGroupForMenu === group}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleRenameGroup}>Rename</MenuItem>
                  <MenuItem onClick={handleDeleteGroup}>Delete Task Group</MenuItem>
                </Menu>
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowTaskGroupPopup(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default App;
