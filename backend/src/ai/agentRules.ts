import fs from "node:fs";
import path from "node:path";

export type AgentDomain =
  | "core"
  | "attention"
  | "architecture"
  | "data"
  | "finance"
  | "product"
  | "risk";

export interface AgentRule {
  id: string;
  domain: AgentDomain;
  name: string;
  content: string;
  sourcePath: string;
}

export interface SkillRule {
  id: string;
  name: string;
  content: string;
  sourcePath: string;
}

const APP_ROOT = path.resolve(process.cwd(), "..");

function readMarkdownFiles(dir: string, domain: AgentDomain, recursive = true): AgentRule[] {
  if (!fs.existsSync(dir)) return [];

  const rules: AgentRule[] = [];

  const walk = (currentDir: string) => {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (recursive) walk(fullPath);
        continue;
      }
      if (!entry.name.endsWith(".md")) continue;

      rules.push({
        id: path.relative(APP_ROOT, fullPath).replace(/\\/g, "/"),
        domain,
        name: entry.name.replace(/\.md$/, ""),
        content: fs.readFileSync(fullPath, "utf8"),
        sourcePath: fullPath,
      });
    }
  };

  walk(dir);
  return rules;
}

function loadAgentRules(): AgentRule[] {
  const agentsRoot = path.join(APP_ROOT, "agents", "rules");
  const core = readMarkdownFiles(agentsRoot, "core", false);
  const domains: Array<[AgentDomain, string]> = [
    ["attention", "attention"],
    ["architecture", "architecture"],
    ["data", "data"],
    ["finance", "finance"],
    ["product", "product"],
    ["risk", "risk"],
  ];

  const specialized = domains.flatMap(([domain, folder]) =>
    readMarkdownFiles(path.join(agentsRoot, folder), domain),
  );

  return [...core, ...specialized];
}

function loadSkills(): SkillRule[] {
  const skillsRoot = path.join(APP_ROOT, "skills");
  if (!fs.existsSync(skillsRoot)) return [];

  return fs
    .readdirSync(skillsRoot)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const fullPath = path.join(skillsRoot, name);
      return {
        id: path.relative(APP_ROOT, fullPath).replace(/\\/g, "/"),
        name: name.replace(/\.md$/, ""),
        content: fs.readFileSync(fullPath, "utf8"),
        sourcePath: fullPath,
      };
    });
}

let cachedAgents: AgentRule[] | null = null;
let cachedSkills: SkillRule[] | null = null;

export function getAgentRules(): AgentRule[] {
  cachedAgents ??= loadAgentRules();
  return cachedAgents;
}

export function getSkills(): SkillRule[] {
  cachedSkills ??= loadSkills();
  return cachedSkills;
}

export function getCoreIntelligence(): string | null {
  const core = getAgentRules().find((rule) => rule.name === "modo-intelligence");
  return core?.content ?? null;
}

export function getAgentRuleByDomain(domain: AgentDomain): AgentRule[] {
  return getAgentRules().filter((rule) => rule.domain === domain);
}

export function getSkill(name: string): SkillRule | null {
  return getSkills().find((skill) => skill.name === name) ?? null;
}

export function buildSystemPrompt(opts?: { domains?: AgentDomain[]; skills?: string[] }): string {
  const parts: string[] = [];

  const core = getCoreIntelligence();
  if (core) parts.push(core);

  const domains = opts?.domains ?? ["attention"];
  for (const domain of domains) {
    for (const rule of getAgentRuleByDomain(domain)) {
      if (rule.name === "modo-intelligence") continue;
      parts.push(`## ${rule.name}\n\n${rule.content}`);
    }
  }

  for (const skillName of opts?.skills ?? []) {
    const skill = getSkill(skillName);
    if (skill) parts.push(`## Skill: ${skill.name}\n\n${skill.content}`);
  }

  return parts.join("\n\n---\n\n");
}

export function getAgentRulesSummary() {
  const agents = getAgentRules();
  const skills = getSkills();
  return {
    agentsRoot: path.join(APP_ROOT, "agents", "rules"),
    skillsRoot: path.join(APP_ROOT, "skills"),
    agentCount: agents.length,
    skillCount: skills.length,
    domains: [...new Set(agents.map((rule) => rule.domain))],
    skills: skills.map((skill) => skill.name),
  };
}
