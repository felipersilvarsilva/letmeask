import {  ReactNode } from "react";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

//Room copy
type RoomCodeProps = {
  code: string;
}

type RoomParams = {
	id: string,
}

//questions
type FirebaseQuestions = Record<string,{
	author: {
		name:string;
		avatar: string;
	} 
	content:string;
	isAnswered: boolean;
	isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>


type TypeQuestion = {
	id: string;
	author:{
		name: string,
		avatar: string,
	}
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

//component questions
type QuestionProps= {
  content: string;
  author:{
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isHighlighted?: boolean;
  isAnswered?: boolean;
  
}

export type {
  User,
  AuthContextProviderProps,
  AuthContextType,
  RoomCodeProps,
  RoomParams,
  FirebaseQuestions,
  TypeQuestion,
	QuestionProps
}