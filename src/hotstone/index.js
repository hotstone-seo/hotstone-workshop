import React from 'react'
import Helmet from 'react-helmet'
import { renderHelmetTags } from 'hotstone-client/lib/react';

class HelmetWrapper extends React.Component {
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
          </div>
      );
  }
}

export { HelmetWrapper }