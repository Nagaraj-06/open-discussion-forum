import React, { useEffect, useState } from 'react'
import Subreplies from './Subreplies';
import axios from 'axios';

const ViewReplies = ({MainReplyId,MainReplyUsername,SubReplyId,SubReplyUsername,post_id,email,username,question1}) => {

const [viewReply,setViewReply]=useState(false);
const [subb,setSubb]=useState([]);

  return (
    <>
     <button className="open-btn" onClick={()=>{
                
                setViewReply(!viewReply);
                

            }}>View Replies</button>


            
                {SubReplyId==null && viewReply==true ?  <div>
                        
                        <Subreplies MainReplyId={MainReplyId} MainReplyUsername={MainReplyUsername} post_id={post_id} email={email} username={username} question1={question1} />

                    </div> :null}
                {MainReplyId==null && viewReply==true ?  <div>
                        
                        <Subreplies SubReplyId={SubReplyId} SubReplyUsername={SubReplyUsername} post_id={post_id} email={email} username={username} question1={question1} />

                    </div> :null}
    </>
  )
}

export default ViewReplies

