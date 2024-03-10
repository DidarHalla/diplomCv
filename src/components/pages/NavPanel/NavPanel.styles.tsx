import { Breadcrumbs, BreadcrumbsProps, styled } from "@mui/material";

export const BreadCrumbs = styled(Breadcrumbs)<BreadcrumbsProps>(

  ({ theme }) => ({
    textAlign:"center",
    width:100+"%",
    position: "fixed",
    left:0,
    top: 64,
    height: 44,
    // margin: "0 auto",
    zIndex: 3,
    paddingTop: 20,

    backgroundColor: theme.palette.background.default,
    // width: "100%",
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
