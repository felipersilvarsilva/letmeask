// images
import copyImg from 'assets/images/copy.svg';

//styles
import 'styles/room-cod.scss';

export function RoomCode(){
  return(
    <button className="room-code">
      <div>
        <img src={copyImg} alt="copy room code" />
      </div>
      <span>Sala -McqgtZpYBruEhi8lzlP</span>
    </button>
  )
}