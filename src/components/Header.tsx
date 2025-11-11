import { Link } from 'react-router-dom';
import logo from '@/assets/monkedex-logo.png';

const Header = () => {
  return (
    <header className="border-b border-border py-6 px-6 sticky top-0 bg-background z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="hover:opacity-70 transition-opacity">
            <img src={logo} alt="The Monkedex" className="h-12" />
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link to="/" className="hover:opacity-70 transition-opacity">
              INDEX
            </Link>
            <Link to="/about" className="hover:opacity-70 transition-opacity">
              ABOUT
            </Link>
            <Link to="/submit" className="hover:opacity-70 transition-opacity">
              LOG ENTRY
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
