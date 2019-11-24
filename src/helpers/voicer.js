export default cb => {
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  let finalTranscript = '';
  const recognition = new window.SpeechRecognition();
  recognition.interimResults = false;
  recognition.maxAlternatives = 10;
  recognition.continuous = false;
  recognition.onresult = event => {
    // let interimTranscript = '';
    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
      const { transcript } = event.results[i][0];
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        // interimTranscript += transcript;
      }
    }
    cb(finalTranscript);
  };
  recognition.start();
};
