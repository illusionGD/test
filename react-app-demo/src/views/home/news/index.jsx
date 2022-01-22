import { useLocation, useNavigate } from 'react-router-dom'

export default function News (props) {
  console.log(props,useLocation())
  let navigate = useNavigate();
  return (
    <div>
      news
      <button onClick={()=> navigate('/home')}>link</button>
    </div>
  )
}
