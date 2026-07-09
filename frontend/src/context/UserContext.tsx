import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "MANAGER" | "EXECUTIVE" | "LEADERSHIP";

export const ROLE_LABELS: Record<Role, string> = {
  MANAGER: "Manager",
  EXECUTIVE: "Executive",
  LEADERSHIP: "Leadership",
};

export interface CurrentUser {
  name: string;
  role: Role;
  company: string;
  department: string;
}

interface UserContextValue {
  user: CurrentUser;
  setRole: (role: Role) => void;
  can: (capability: Capability) => boolean;
}

export type Capability =
  | "view:reimagine"
  | "view:global-maps"
  | "view:decision-dna"
  | "view:strategic-drift"
  | "view:admin"
  | "view:board-metrics";

const ROLE_CAPABILITIES: Record<Role, Capability[]> = {
  MANAGER: [
    "view:reimagine",
    "view:global-maps",
    "view:decision-dna",
    "view:strategic-drift",
    "view:board-metrics",
    "view:admin",
  ],
  EXECUTIVE: [
    "view:reimagine",
    "view:global-maps",
    "view:decision-dna",
    "view:strategic-drift",
    "view:board-metrics",
    "view:admin",
  ],
  LEADERSHIP: [
    "view:reimagine",
    "view:global-maps",
    "view:decision-dna",
    "view:strategic-drift",
    "view:board-metrics",
    "view:admin",
  ],
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("EXECUTIVE");

  const user: CurrentUser = {
    name: "Helena Duarte",
    role,
    company: "Acme Electronics",
    department: "Strategy",
  };

  const can = (capability: Capability) =>
    ROLE_CAPABILITIES[role].includes(capability);

  return (
    <UserContext.Provider value={{ user, setRole, can }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
