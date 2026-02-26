import React from "react";
import { PageContainer, PageHeader, PageHeaderToolbar } from "@toolpad/core";
import { Button, Tooltip, Stack } from "@mui/material";
import * as Icons from "@mui/icons-material";

const Page = ({ title, breadcrumbs, actions = [], children }) => {
  const Header = () => (
    <PageHeader
      title={title}
      breadcrumbs={breadcrumbs}
      slots={{
        toolbar: () =>
          actions?.length ? (
            <PageHeaderToolbar>
              <Stack direction="row" spacing={1}>
                {actions
                  .filter((action) => !action.hidden)
                  .map((action, index) => {
                    const button = (
                      <Button
                        key={index}
                        variant={action.variant || "contained"}
                        color={action.color || "primary"}
                        onClick={action.onClick}
                        disabled={action.disabled}
                        type={action.type}
                        // startIcon={IconComponent ? <IconComponent /> : null}
                      >
                        {action.label}
                      </Button>
                    );

                    return action.tooltip ? (
                      <Tooltip key={index} title={action.tooltip}>
                        <span>{button}</span>
                      </Tooltip>
                    ) : (
                      button
                    );
                  })}
              </Stack>
            </PageHeaderToolbar>
          ) : null,
      }}
    />
  );

  return <PageContainer slots={{ header: Header }}>{children}</PageContainer>;
};

export default Page;
