import { NavLink } from 'react-router-dom'

import './NavBarLink.scss'

interface NavBarLinkProps {
  path: string
  name?: string
}

export const NavBarLink: React.FC<NavBarLinkProps> = ({ name, path }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `mobile navbar-nav-link navbar-nav-link_${isActive ? 'active' : 'inactive'}`
      }
      to={path}
    >
      <span className="navbar-nav-link_link">{name}</span>
    </NavLink>
  )
}
