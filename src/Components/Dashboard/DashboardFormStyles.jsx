import { createStyles, rem } from "@mantine/core";

export const useDashboardFormStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        },
      root: {
        position: 'relative',
      },
    
      input: {
        height: rem(54),
        paddingTop: rem(18),
      },
    
      label: {
        position: 'absolute',
        pointerEvents: 'none',
        fontSize: theme.fontSizes.xs,
        paddingLeft: theme.spacing.sm,
        paddingTop: `calc(${theme.spacing.sm} / 2)`,
        zIndex: 1,
      },
    }));