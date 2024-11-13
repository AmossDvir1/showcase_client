import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Badge, { BadgeProps } from '@mui/material/Badge';
import Stack from '@mui/material/Stack';

interface ActiveBadgeProps {
children: ReactNode;
ripple?: boolean;
  };

  interface ActiveBadgeProps extends Omit<BadgeProps, 'ripple'> {
    children: ReactNode;
    ripple?: boolean;
  }
  
  const StyledBadge = styled(Badge)<ActiveBadgeProps>(({ theme, ripple }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'fixed',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: ripple ? '1px solid currentColor' : "none",
        content: '""',
        animation: ripple ? 'ripple 1.7s infinite ease-in-out' : 'none',
      },
    },
    "& .MuiBadge-dot": {
      height: 8,
      minWidth: 8,
      borderRadius: 10,
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(0.1)',
        opacity: 1,
      },
      '50%': {
        transform: 'scale(2.8)',
        opacity: 0,
      },
      '100%': {
        transform: 'scale(2.8)',
        opacity: 0,
      },
    },
  }));
  

const ActiveBadge: React.FC<ActiveBadgeProps> = ({children, ripple = false}) => {
  return (
    <Stack direction="row" spacing={2}>
      <StyledBadge
        // ripple={ripple}
        overlap="circular"
        sx={{width:1, height:1}}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        {children}
        </StyledBadge>
    </Stack>
  );
}

export default ActiveBadge;