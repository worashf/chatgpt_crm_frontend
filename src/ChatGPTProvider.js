// import React, { useState, useEffect } from 'react';
// export const MyContext = React.createContext();
// const ChatGPTProvider = ({ children }) => {
//   const [chatGPT, setChatGPT] = useState(null);
//   const MyContext = React.createContext();
//   useEffect(() => {
//     (async () => {
//         const { ChatGPT } = await import(chrome.runtime.getURL('lib/chatgpt.js'));
//       console.log(ChatGPT, "created chat")
//       setChatGPT(new ChatGPT());
//     })();
//   }, []);

//   return (
//     <MyContext.Provider value={chatGPT}>
//       {children}
//     </MyContext.Provider>
//   );
// };

// export default ChatGPTProvider;
