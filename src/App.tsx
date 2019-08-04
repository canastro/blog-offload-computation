import React from 'react';

import IdleCallbackExample from './examples/IdleCallbackExample';
import NormalExample from './examples/NormalExample';

const App: React.FC = () => {
  return (
    <div className="App">
      <IdleCallbackExample />
      <NormalExample />
    </div>
  );
}

export default App;
