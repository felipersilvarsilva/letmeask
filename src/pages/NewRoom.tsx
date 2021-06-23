import { Link } from 'react-router-dom';

//auth
import { useAuth } from 'hooks/useAuth';


// images
import inllustratorImg from 'assets/images/illustration.svg';
import logoImg from 'assets/images/logo.svg';

//components
import {Button} from 'components/button/Button'

//styls
import 'styles/auth.scss';


export function NewRoom(){
  // const { user } = useAuth
  
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
        <form>
          <input
           type="text"
           placeholder="Nome da Sala" 
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
