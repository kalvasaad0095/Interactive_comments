import React, { useContext } from 'react';
import './App.css';
import CommentBox from './components/CommentBox/CommentBox';
import CommentInput from './components/CommentInput/CommentInput';
import { DataContext } from './provider';

function App() {
  console.log('Building App')
  const [comments, setComments] = useContext(DataContext);
  // console.log(comments)
  const [reload, setReload] = React.useState(false);
  function reloadApp() {
    setReload(!reload);
  }
  return (
    <div className="container">
      <div className="comment">
        {comments !== undefined ?
          
          comments.comments.map(item => <CommentBox reloadApp={reloadApp} comment={item} key={item.id} />)
          : null
        }
      </div>
      <CommentInput />
    </div>
  );
}

export default App;
