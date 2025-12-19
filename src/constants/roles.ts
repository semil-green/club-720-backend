export const ROLES = {
    admin: "admin",
    writer: "writer",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
