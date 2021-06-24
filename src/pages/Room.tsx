import { useParams } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'

import logoImg from 'assets/images/logo.svg'

import {Button} from 'components/Button'
import { RoomCode } from 'components/RoomCode'

import {RoomParams, FirebaseQuestions, Question} from 'types/Types'

import { useAuth } from 'hooks/useAuth'

import 'styles/room.scss';
import { database } from 'services/firebase'


export function Room(){
		const {user} = useAuth();
		const params = useParams<RoomParams>();	
		const [newQuestion, setNewQuestion] = useState('')
		const [questions, setQuestions] = useState<Question[]>([])
		const [title, setTitle] = useState('');

		const roomId = params.id;

		useEffect(() => {
			console.log(roomId)
			const roomRef = database.ref(`rooms/${roomId}`);

			roomRef.on(`value`, room => {
				const databaseRoom = room.val();
				const firebaseQuestions = databaseRoom.question as FirebaseQuestions;

				const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(([key, value]) => {
					return{
						id: key,
						content: value.content,
						author: value.author,
						isHighlighted: value.isHighlighted,
						isAnswered: value.isAnswered, 
					}
				})

				setTitle(databaseRoom.title);
				setQuestions(parsedQuestions);
			})
		}, [roomId])

		async function  handleSendQuestions( event: FormEvent) {
			event.preventDefault();

			if (newQuestion.trim()=== ''){
				return;
			}

			if(!user){
				throw new Error(" You must be  logged in")
			}

			const question = {
				content: newQuestion,
				author: {
					name: user.name,
					avatar: user.avatar,
				},
				isHighlighted: false,
				isAnswered: false
			};

			await database.ref(`rooms/${roomId}/question`).push(question);
		}

	return(
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />
					<RoomCode code={roomId}/>
				</div>
			</header>
			<main>
				<div className="room-title">
					<h1>sala Teste {title}</h1>
				  {questions.length > 0 && <span>{questions.length} perguntas</span>}
				</div>

				<form onSubmit={handleSendQuestions}>
					<textarea 
						cols= {50}
						rows= {10}
						placeholder=" o que você que perguntar?"
						onChange={event => setNewQuestion(event.target.value)}
						value={newQuestion}
					/>
						<div className="form-footer">
							{user ? (
								<div className="user-info">
									<img src={user.avatar} alt={user.name}/>
									<span>{user.name}</span>
								</div>
							) : (
								<span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
							)}
							
							<Button type="submit" disabled={!user}>Enviar pergunta</Button>
						</div>
				</form>
				{JSON.stringify(questions)}
			</main>
		</div>
	);
}