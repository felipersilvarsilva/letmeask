import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react'

//auth
import { useAuth } from 'hooks/useAuth';
import { database } from 'services/firebase';


// images
import inllustratorImg from 'assets/images/illustration.svg';
import logoImg from 'assets/images/logo.svg';

//components
import {Button} from 'components/Button'

//styls
import 'styles/auth.scss';



export function NewRoom(){
   const { user } = useAuth()
  const history = useHistory()
  const [ newRoom, steNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent ){
    event.preventDefault();

    if (newRoom.trim() ===''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }
  
  return(
    <div id="page-auth">
      <aside>
        <img src={inllustratorImg} alt="Inlustrção perguntas e respostas"/>
        <strong>Toda pergunta tem uma respostas.</strong>
        <p>Tire as dúbidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        
      <div className="main-content">
        <img src={logoImg} alt="Letmeask" />   
        <h2>
          Crie uma nova sala
        </h2>
        <form onSubmit={handleCreateRoom}> 
          <input
           type="text"
           placeholder="Nome da Sala"
           onChange={event => steNewRoom(event.target.value)} 
           value={newRoom}
          />
          <Button type="submit">
            Cria sala
          </Button>
        </form>

        <p>Quer entra em uma sala já existente? <Link to='/'>Clique aqui</Link></p>
      </div>
      </main>
    </div>
  )
}
