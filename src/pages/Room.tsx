import logoImg from 'assets/images/logo.svg'

import {Button} from 'components/Button'
import { RoomCode } from 'components/RoomCode'

import 'styles/room.scss';

export function Room(){
	return(
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />
					<RoomCode />
				</div>
			</header>
			<main>
				<div className="room-title">
					<h1>sala react</h1>
				  <span>4 perguntas</span>
				</div>

				<form action="">
					<textarea 
						cols= {50}
						rows= {10}
						placeholder=" o que você que perguntar?"
					/>
						<div className="form-footer">
							<span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
							<Button type="submit">Enviar pergunta</Button>
						</div>
				</form>
			</main>
		</div>
	);
}