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

}>


type Question = {
	id: string;
	author:{
		name: string,
		avatar: string,
	}
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
}

export type {
  User,
  AuthContextProviderProps,
  AuthContextType,
  RoomCodeProps,
  RoomParams,
  FirebaseQuestions,
  Question
}