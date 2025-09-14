// import React, { useState } from "react";
// import axios from 'axios';
// import {Link, useLocation} from 'react-router-dom';

// export default function Start_Discuss(props) {
  
//   const location = useLocation();
//   const email = location.state?.data;

//     const [title, setTitle] = useState('');
//     const [subject, setSubject] = useState('');
//     const [chapter, setChapter] = useState('');
//     const [topic, setTopic] = useState('');
//     const [ques, setQues] = useState('');

//     if (!email) {
//       return <div>Data not available</div>; // or redirect to login page
//     }
  
//     // console.log(data.email);
//     // console.log("skj",data.password);

//     function addQuestions() {
//         // console.log(data.email);
//     // console.log("Add Question",data.password);

//         axios.post('http://localhost:2000/Discussion', {
//             title: title,
//             subject: subject,
//             chapter: chapter,
//             topic: topic,
//             ques: ques,
//             email: email,
           
//         }).then(() => {
//             console.log("Question added successfully");
//         }).catch((error) => {
//             console.error("Error adding question:", error);
//         });
//     }

//     return (
//         <div className="App">
//             <div className="information">
          
//                 <label>Title:</label>
//                 <input type="text" name="Title" onChange={(e) => setTitle(e.target.value)} /><br /><br />

//                 <label>Subject:</label>
//                 <select name="Subject" onChange={(e) => setSubject(e.target.value)}>
//                     <option value="">Select a Subject</option>
//                     <option value="Maths">Maths</option>
//                     <option value="Physics">Physics</option>
//                     <option value="Chemistry">Chemistry</option>
//                 </select> <br />

//                 <label>Chapter:</label>
//                 <select name="Chapter" onChange={(e) => setChapter(e.target.value)}>
//                     <option value="">Select a Chapter</option>
//                     <option value="Chapter-1">Chapter 1</option>
//                     <option value="Chapter-2">Chapter 2</option>
//                     <option value="Chapter-3">Chapter 3</option>
//                 </select><br />

//                 <label>Topic:</label>
//                 <select name="Topic" onChange={(e) => setTopic(e.target.value)}>
//                     <option value="">Select a Topic</option>
//                     <option value="Topic-1">Topic-1</option>
//                     <option value="Topic-2">Topic-2</option>
//                     <option value="Topic-3">Topic-3</option>
//                 </select><br />

//                 <label>Question:</label>
//                 <input type="text" name="Ques" onChange={(e) => setQues(e.target.value)} /><br /><br />

//         <Link to="/Discussion/Questions" state={{data: email }}>
//              <button onClick={addQuestions}>Add Question</button>
//         </Link>
                
//             </div>
//         </div>
        
//     );
// }
