import { Components, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material';

// Custom component styles
const getComponents = (theme: Theme): Components => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 6px 14px rgba(0, 0, 0, 0.12)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #0062e6 30%, #33a1fd 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #0046a6 30%, #0062e6 90%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #00b248 30%, #00e676 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #009624 30%, #00b248 90%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 8px 24px rgba(0, 0, 0, 0.2)' 
            : '0 8px 24px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          backdropFilter: 'blur(8px)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 16px 32px rgba(0, 0, 0, 0.3)' 
              : '0 16px 32px rgba(0, 0, 0, 0.1)',
          },
          backgroundColor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.paper, 0.8)
            : alpha(theme.palette.background.paper, 0.9),
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backdropFilter: 'blur(8px)',
          backgroundColor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.paper, 0.9)
            : alpha(theme.palette.background.paper, 0.9),
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.primary.main,
              opacity: 1,
              border: 'none',
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: theme.palette.primary.main,
            border: '6px solid #fff',
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 26 / 2,
          border: `1px solid ${theme.palette.grey[400]}`,
          backgroundColor: theme.palette.grey[300],
          opacity: 1,
          transition: theme.transitions.create(['background-color', 'border']),
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          '&.MuiChip-colorPrimary': {
            background: 'linear-gradient(45deg, #0062e6 30%, #33a1fd 90%)',
          },
          '&.MuiChip-colorSecondary': {
            background: 'linear-gradient(45deg, #00b248 30%, #00e676 90%)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        },
        head: {
          fontWeight: 600,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
          backdropFilter: 'blur(8px)',
          background: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.paper, 0.9)
            : alpha(theme.palette.background.paper, 0.9),
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 24px 48px rgba(0, 0, 0, 0.3)' 
            : '0 24px 48px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${alpha(theme.palette.primary.main, 0.5)} ${
            theme.palette.mode === 'dark' ? alpha('#000', 0.1) : alpha('#fff', 0.1)
          }`,
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.mode === 'dark' ? alpha('#000', 0.1) : alpha('#fff', 0.1),
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '4px',
            background: alpha(theme.palette.primary.main, 0.5),
            '&:hover': {
              background: theme.palette.primary.main,
            },
          },
        },
      },
    },
  };
};

export default getComponents;
