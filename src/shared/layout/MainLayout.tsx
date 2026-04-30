import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageCircle, 
  Users, 
  Wind, 
  ShieldCheck, 
  Heart,
  LogOut 
} from 'lucide-react';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">Í</div>
            <span>Íris</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/checkin" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Heart size={20} />
            <span>Check-in</span>
          </NavLink>
          <NavLink to="/support" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <MessageCircle size={20} />
            <span>Suporte Íris</span>
          </NavLink>
          <NavLink to="/community" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Users size={20} />
            <span>Comunidade</span>
          </NavLink>
          <NavLink to="/breathing" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Wind size={20} />
            <span>Respiração</span>
          </NavLink>
          <NavLink to="/vault" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <ShieldCheck size={20} />
            <span>Cofre</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout">
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
};
