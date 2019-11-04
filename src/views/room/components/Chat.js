/* eslint-disable react/prop-types */
import React from 'react';

const Chat = props => {
  const { conversation, loading } = props;
  return (
    <div>
      {loading &&
        conversation.map((c, index) => {
          return <div key={index}>{c}</div>;
        })}
      {!loading && 'loading...'}
    </div>
  );
};

export default Chat;
