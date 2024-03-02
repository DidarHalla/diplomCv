import { Breadcrumbs, BreadcrumbsProps, styled } from "@mui/material";

export const BreadCrumbs = styled(Breadcrumbs)<BreadcrumbsProps>(
  ({ theme }) => ({
    position: "fixed",
    top: 64,
    height: 44,
    zIndex: 3,
    paddingTop: 20,
    backgroundColor: theme.palette.background.default,
    width: "100%",
    maxWidth: theme.breakpoints.values.xl,
    ".MuiBreadcrumbs-ol": {
      flexWrap: "nowrap",
    },
    ".MuiBreadcrumbs-li": {
      whiteSpace: "nowrap",
    },
    "& .MuiBreadcrumbs-li:last-child": {
      pointerEvents: "none",
      opacity: 0.6,
    },
  })
);
