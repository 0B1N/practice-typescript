/** arg의 값을 캡쳐해 타입으로 사용한다. */
function identity<T>(arg: T): T {
  return arg;
};

const test = identity<string>("asdf");

function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length); // Error: T doesn't have .length
  return arg;
}
/**  */

let myIdentity1: <T>(arg: T) => T = identity;

let myIdentity2: <U>(arg: U) => U = identity;

let myIdentity3: { <T>(arg: T): T } = identity;
/**  */

interface GenericIdentityFn1 {
  <T>(arg: T): T;
}

let myIdentity4: GenericIdentityFn1 = identity;

interface GenericIdentityFn<T> {
  (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;

class GenericNumber<T> {
  zeroValue!: T;
  add!: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
  return x + y;
};

interface Lengthwise {
  length: number;
}

function loggingIdentity123<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4, asdfasdf: "adsfasdf" };

getProperty(x, "asdfasdf");

/** Partial<T> */
interface Todo11 {
  title: string;
  description: string;
}

function updateTodo(todo: Todo11, fieldsToUpdate: Partial<Todo11>) {
  // todo, fieldToUpdate 두개 모두 값이 있을경우 오른쪽 값이 할당됩니다.
  return { ...todo, ...fieldsToUpdate };
}

const ffffasdf = {
  title: 'organize desk',
  description: 'clear clutter',
};

const todo2 = updateTodo(ffffasdf, {
  description: 'throw out trash',
});

type vvv<T> = { [P in keyof T]?: T[P]; };

/** Partial<T> */

/** 
 * Record<T, K> 
 * T가 Key, K가 value형식으로 사용할수있음
 * Record<"html | css", { value: string }>
 */
interface PageInfo {
  title: string;
}

type Page = 'home' | 'about' | 'contact';

const ff: Record<Page, PageInfo> = {
  about: { title: 'about' },
  contact: { title: 'contact' },
  home: { title: 'home' },
};

type memo = { content: string, date: string }
const FRIENDS_LIST = ["harry", "jason", "dukkey"] as const
type FriendTypeArray = typeof FRIENDS_LIST[number];
type friendType = Record<FriendTypeArray, memo>
/** Record<T, K> */

/** Pick<T, K> */
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title'>;

const todo: TodoPreview = {
  title: 'Clean room',
  // completed: false,
};
/** Pick<T, K> */

/** 
 * Omit<T, K>
 * T에서 K를 빼는거
 */
interface OmitTodo {
  title: string;
  description: string;
  completed: boolean;
}

type OmitTodoPreview = Omit<OmitTodo, 'description'>;

const Omittodo: OmitTodoPreview = {
  title: 'Clean room',
  completed: false,
};
/** Omit<T,K> */

type T0 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;  // "c"
type T2 = Exclude<string | number | (() => void), Function>;  // string | number

type asdf<T, U> = T extends U ? never : T
type asff = asdf<"a" | "b" | "c" | "b" , "aa">;


export interface Car {
  name: string,
  price: number
}

const productList: Record<"SONATA" | "AVANTE", Car> = {
  SONATA: {name: "SONATA", price: 10000},
  AVANTE: {name: "SONATA", price: 10000}
}

const nextProductList: Record<string, Car> = {
  SONATA: {name: "SONATA", price: 10000},
  AVANTE1: {name: "SONATA", price: 10000},
  AVANTE2: {name: "SONATA", price: 10000},
  AVANTE3: {name: "SONATA", price: 10000},
}

/**
 * HTML이 첫번째 파라미터로 들어갔을때, 두번째 파라미터에 HTML, PUG가 자동완성 되도록
 */
enum Direction {
  HTML = "HTML",
  CSS = "CSS",
  JavaScript = "JavaScript",
}

type TCategory = "HTML" | "CSS" | "JavaScript";
const HTMLCategory = ["HTML", "Pug"] as const;
const CSSCategory = ["Sass", "Less"] as const;
const JSCategory = ["React", "Vue", "Angular"] as const;

// type TDescription<T> = "HTML" extends T ? typeof HTMLCategory[number] : "CSS" extends T ? typeof CSSCategory[number] : typeof JSCategory[number];
type TDescription<T> = T extends Direction.HTML ? typeof HTMLCategory[number] : T extends Direction.CSS ? typeof CSSCategory[number] : typeof JSCategory[number];

function testFunction<Cateogry>(category: TCategory, desc: TDescription<Cateogry>) {
  
}


testFunction("CSS", "Angular")
