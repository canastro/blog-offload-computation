import React from 'react';

import './App.css';
import IdleCallbackExample from './examples/IdleCallbackExample';
import NormalExample from './examples/NormalExample';
import Animation from './Animation';

const App: React.FC = () => (
  <div className="app-root">
    <div className="app-examples">
      <IdleCallbackExample />
      <NormalExample />
    </div>
    <Animation />
  </div>
);

export default App;
