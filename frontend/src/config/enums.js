const enums = {
  roleTypeCodes: {
    ADMIN: "0001",
    MANAGER: "0002",
    OPERATOR: "0003",
  },

  arnConstants: {
    DASHBOARD_VIEW: "app:dashboard:view",

    ADMISSION_CREATE: "app:admission:create",
    ADMISSION_EDIT: "app:admission:update",
    ADMISSION_VIEW: "app:admission:view",
    ADMISSION_DELETE: "app:admission:delete",

    INSTITUTION_CREATE: "app:institution:create",
    INSTITUTION_EDIT: "app:institution:update",
    INSTITUTION_VIEW: "app:institution:view",
    INSTITUTION_DELETE: "app:institution:delete",

    CAMPUS_CREATE: "app:campus:create",
    CAMPUS_EDIT: "app:campus:update",
    CAMPUS_VIEW: "app:campus:view",
    CAMPUS_DELETE: "app:campus:delete",

    DEPARTMENT_CREATE: "app:department:create",
    DEPARTMENT_EDIT: "app:department:update",
    DEPARTMENT_VIEW: "app:department:view",
    DEPARTMENT_DELETE: "app:department:delete",

    PROGRAM_CREATE: "app:program:create",
    PROGRAM_EDIT: "app:program:update",
    PROGRAM_VIEW: "app:program:view",
    PROGRAM_DELETE: "app:program:delete",

    QUOTAS_CREATE: "app:quotas:create",
    QUOTAS_EDIT: "app:quotas:update",
    QUOTAS_VIEW: "app:quotas:view",
    QUOTAS_DELETE: "app:quotas:delete",

    SEAT_MATRIX_CREATE: "app:seatMatrix:create",
    SEAT_MATRIX_EDIT: "app:seatMatrix:update",
    SEAT_MATRIX_VIEW: "app:seatMatrix:view",
    SEAT_MATRIX_DELETE: "app:seatMatrix:delete",
  },
};

export default enums;
