import { useHistory, useParams } from 'react-router-dom'
// import { FormEvent, useState } from 'react'

import logoImg from 'assets/images/logo.svg'
import deliteImg from 'assets/images/delete.svg';
import checkboxImg from 'assets/images/check.svg';
import answerImg from 'assets/images/answer.svg'; 

// como inporta multiplis arquivos de uma so  vez no react
import {Button} from 'components/Button'
import { RoomCode } from 'components/RoomCode'
import { Question } from 'components/Question'

import {RoomParams} from 'types/Types'

import { useRoom } from 'hooks/useRoom'
// import { useAuth } from 'hooks/useAuth'

import { database } from 'services/firebase'

import 'styles/Room/room.scss';


export function AdminRoom(){
		// const {user} = useAuth();
		const history = useHistory()
		const params = useParams<RoomParams>();	
		const roomId = params.id;
		const { questions, title} = useRoom(roomId)

		async function handlecheckQuestionAnswer(questionId: string){
			await database.ref(`rooms/${roomId}/questions/${questionId}`).update({ 
				isAnswered: true,
			})
		}
		async function handleHighlightQuestion(questionId: string){
			await database.ref(`rooms/${roomId}/questions/${questionId}`).update({ 
				isHighlighted: true,
			})
		}

		async function handleEndRoom(){
			database.ref(`rooms/${roomId}`).update({
				endedAt: new Date(),
			})

			history.push('/')
		}

		async function handleDeleteQuestion(questionId: string){
		if(window.confirm('tem certeza que você deseja excluir esta pergunta?')){
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
		}
		}

	return(
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />
					<div>
            <RoomCode code={roomId}/>
            <Button isOutlined onClick={handleEndRoom}> Encerrar sala</Button>
          </div>
				</div>
			</header>
			<main>
				<div className="room-title">
					<h1>sala Teste {title}</h1>
				  {questions.length > 0 && <span>{questions.length} perguntas</span>}
				</div>

				<div className="question-list">
					{questions.map(question =>{
						return(
							<Question
								key={question.id}
								content={question.content}
								author={question.author}
								isHighlighted = {question.isHighlighted}
								isAnswered={question.isAnswered}
							>
								{!question.isAnswered && (
									<>
									<button
									type="button"
									 onClick={() => handlecheckQuestionAnswer(question.id)}
									 >								
										<img src={checkboxImg} alt="check pergunta" />
									</button>
									<button
									type="button"
									 onClick={() => handleHighlightQuestion(question.id)}
									>
										<img src={answerImg} alt="responde pergunta" />
									</button>
									</>
								)}
								<button
								type="button"
								onClick={() => handleDeleteQuestion(question.id)}
								>
									<img src={deliteImg} alt="Remoer pergunta" />
								</button>
							</Question>
						)
					})}
				</div>
			</main>
		</div>
	);
}