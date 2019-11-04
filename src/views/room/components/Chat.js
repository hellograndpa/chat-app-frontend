/* eslint-disable react/prop-types */
import React from 'react';
import '../../../index.css';

const Chat = props => {
  const { conversation, loading } = props;
  return (
    <div className="chatwrapper">
      <div className="chat">
        {!loading &&
          conversation.map((c, index) => {
            return <div key={index}>{c.text}</div>;
          })}
        {loading && 'loading...'}
        <div className="anchor"></div>
      </div>
    </div>
  );
};

export default Chat;
