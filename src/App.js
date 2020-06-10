import React from 'react';
import { HotStone, HotStoneContext } from 'hotstone-client';

// import logo from './logo.svg';
import './App.css';

function App(props) {
  const { tags = [], rawHTML } = props.data;
  console.log(`App.Tags: ${tags}`)
  return (
    <HotStone tags={tags}>
      <HotStoneContext.Consumer>
        {(value) =>
          <div className="App">
            <header className="App-header">
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              <p>
                Edit <code>src/App.js</code> and save to reload.
        </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
        </a>
            </header>
          </div>
        }
      </HotStoneContext.Consumer>
    </HotStone>
  );
}

export default App;
