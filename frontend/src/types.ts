export interface User {
  fristName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface Recipe{
  name: string,
  ingredients: string,
  instructions: string,
  timeToCookInMins: number,
  rating: number,
  user: string | {
    _id: string,
    userName: string
  }
}

export interface RecipeSum{
  name: string,
  ingredients: string,
  instructions: string,
  timeToCookInMins: number,
  rating: number,
  user: {
    _id: string,
    userName: string
  }
}