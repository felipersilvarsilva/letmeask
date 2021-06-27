// images
import copyImg from 'assets/images/copy.svg';

//styles
import 'styles/Room/room-cod.scss';

import {RoomCodeProps} from 'types/Types'


export function RoomCode( props: RoomCodeProps){
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code)
  }
  return(
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}