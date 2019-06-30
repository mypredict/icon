import React from 'react';
import Head from './components/sidebar/Head';
import Menu from './components/sidebar/Menu';
import IconContent from './components/IconContent';
import './App.scss';

const App: React.FC = () => {
  return (
    <>
      <aside className="sidebar-page">
        <Head />
        <Menu />
      </aside>
      <IconContent />
    </>
  );
};

export default App;
