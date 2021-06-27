import { useEffect, useState } from "react";
import { database } from "services/firebase";
import { FirebaseQuestions, TypeQuestion } from "types/Types";
import { useAuth } from "./useAuth";

export function useRoom(roomId: string){
  const { user } = useAuth()
  const [questions, setQuestions] = useState<TypeQuestion[]>([])
  const [title, setTitle] = useState('');

  useEffect(() => {
    console.log(roomId)
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on(`value`, room => {
      const databaseRoom = room.val();
      const firebaseQuestions = databaseRoom.questions as FirebaseQuestions;

      const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(([key, value]) => {
        return{
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered, 
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      })

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id])

  return {questions, title}
}