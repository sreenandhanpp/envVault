import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const projects = [
  { name: 'Project Alpha', type: 'Node API', icon: '⌘', envs: 3, vars: 24, members: 6, accent: 'coral' },
  { name: 'Web App', type: 'React Client', icon: '▣', envs: 3, vars: 18, members: 4, accent: 'orange' },
  { name: 'Mobile API', type: 'Gateway', icon: '▯', envs: 3, vars: 16, members: 3, accent: 'red' },
  { name: 'Microservices', type: 'Workers', icon: '⌬', envs: 3, vars: 41, members: 9, accent: 'amber' },
];

const variables = [
  { key: 'DATABASE_URL', value: '••••••••••••', env: 'Development', updated: '13 days ago', by: 'Alex' },
  { key: 'API_KEY', value: '••••••••••', env: 'Staging', updated: '13 days ago', by: 'Maria' },
  { key: 'AWS_SECRET', value: '••••••••••••', env: 'Production', updated: '13 days ago', by: 'Maria' },
  { key: 'JWT_PRIVATE_KEY', value: '••••••••••••', env: 'Production', updated: '2 days ago', by: 'Ken' },
  { key: 'STRIPE_WEBHOOK', value: '••••••••••', env: 'Staging', updated: '5 hours ago', by: 'Alex' },
];

const team = [
  { name: 'Alex Name', email: 'alex@envvault.dev', role: 'Owner', avatar: 'AN' },
  { name: 'Maria Kamer', email: 'maria@envvault.dev', role: 'Admin', avatar: 'MK' },
  { name: 'Maria Teama', email: 'team@envvault.dev', role: 'Member', avatar: 'MT' },
  { name: 'Jordan Lee', email: 'jordan@envvault.dev', role: 'View Only', avatar: 'JL' },
];

const activity = [
  'Alex updated DB_URL (Staging)',
  'Maria added AWS_SECRET (Production)',
  'Ken exported Development .env',
  'Jordan copied API_KEY',
];

function Pill({ children, tone = 'default' }) { return <span className={`pill ${tone}`}>{children}</span>; }

function ProjectCard({ project, ghost }) {
  if (ghost) return <button className="project-card create-card"><span className="big-icon">+</span><span>Create new project</span></button>;
  return <article className="project-card">
    <div className="card-top"><div className={`icon-box ${project.accent}`}><span>{project.icon}</span></div><span>⋮</span></div>
    <h3>{project.name}</h3><p>{project.type}</p>
    <div className="mini-row"><span>Environments</span><b>{project.envs}/3</b></div>
    {['DATABASE_URL','API_KEY','AWS_SECRET'].map((key, index)=><div className="secret-line" key={key}><span>{key}</span><code>••••••••</code>{index === 2 && <Pill tone="dark">Staging</Pill>}</div>)}
    <div className="card-footer"><span>{project.vars} variables</span><span>{project.members} members</span></div>
  </article>;
}

function Dashboard() {
  return <main className="app-shell">
    <section className="login-panel glass">
      <div className="brand"><span className="logo-mark">∞</span><b>EnvVault</b></div>
      <div className="loop"><span>∞</span></div>
      <h1>Centralize.<br/>Secure. Simplify.</h1>
      <p>Securely store and share encrypted environment variables across projects. Never email .env files again.</p>
      <button className="primary">Sign in</button><button className="secondary">Create account</button>
    </section>

    <section className="dashboard glass">
      <header><div className="brand small"><span className="logo-mark">∞</span><b>EnvVault</b></div><span>Hi, Alex <span className="avatar tiny">A</span></span></header>
      <div className="project-grid">{projects.slice(0,2).map(p=><ProjectCard key={p.name} project={p}/>)}<ProjectCard ghost/>{projects.slice(2).map(p=><ProjectCard key={p.name} project={p}/>)}</div>
    </section>

    <section className="variables glass">
      <header><h2>Project Alpha: Variables</h2><div className="search"><span>⌕</span><span>Search</span></div></header>
      <div className="tabs"><Pill>Development</Pill><Pill>Staging</Pill><Pill>Production</Pill></div>
      <table><thead><tr><th>Key</th><th>Value</th><th>Environment</th><th>Last Updated</th><th>Updated By</th><th>Actions</th></tr></thead><tbody>{variables.map(v=><tr key={v.key}><td>{v.key}</td><td><code>{v.value}</code></td><td><Pill tone={v.env.toLowerCase()}>{v.env}</Pill></td><td>{v.updated}</td><td>{v.by}</td><td className="actions"><span>⧉</span><span>✎</span><span>⌫</span></td></tr>)}</tbody></table>
    </section>

    <aside className="editor glass"><div className="modal"><header><b>Edit Variable</b><span>×</span></header><label>Key<input defaultValue="DB_URL"/></label><label>Value<div className="input-icon"><input placeholder="Value (encrypted)"/><span>◉</span></div></label><label>Environment<select defaultValue="Staging"><option>Development</option><option>Staging</option><option>Production</option></select></label><label>Notes<textarea placeholder="Write a variable note..."/></label><button className="primary">Update</button></div></aside>
    <aside className="feed"><h3>Activity Feed</h3>{activity.map((item,i)=><div className="activity" key={item}><span className="avatar">{i%2?'M':'A'}</span><p>{item}<small>{i+1} hour ago</small></p></div>)}</aside>

    <section className="team glass"><h3>Team & Permissions</h3>{team.map(m=><div className="member" key={m.email}><span className="avatar">{m.avatar}</span><div><b>{m.name}</b><small>{m.email}</small></div><select defaultValue={m.role}><option>Owner</option><option>Admin</option><option>Member</option><option>View Only</option></select></div>)}<button className="primary invite"><span>＋</span> Invite team member</button></section>
    <section className="export glass"><h3>Export .env Files</h3><label>Environment<select><option>Development</option><option>Staging</option><option>Production</option></select></label><button className="download"><span>⇩</span> Download .env file</button></section>
  </main>;
}

createRoot(document.getElementById('root')).render(<Dashboard />);
