import React from 'react';

import './App.css';
import IdleCallbackExample from './examples/IdleCallbackExample';
import NormalExample from './examples/NormalExample';

const App: React.FC = () => {
  return (
    <div className="root">
      <IdleCallbackExample />
      <NormalExample />
    </div>
  );
}

export default App;
