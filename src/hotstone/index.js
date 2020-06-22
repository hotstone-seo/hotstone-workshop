import React from 'react'
import Helmet from 'react-helmet'
import { renderHelmetTags } from 'hotstone-client/lib/react';

const HotStoneContext = React.createContext([]);

class HotStoneWrapper extends React.Component {
  constructor(props) {
      super(props);

      const { tags } = props;
      this.state = { tags };
  }

  render() {
      const { tags } = this.state;
      return (
          <div>
              <Helmet>{renderHelmetTags(tags)}</Helmet>
              <HotStoneContext.Provider value={tags}>
                  {this.props.children}
              </HotStoneContext.Provider>
          </div>
      );
  }
}

const HotStone = HotStoneWrapper;

export {HotStone}