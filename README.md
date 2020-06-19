# TypeScript Utility Types

## 유니온(Union)타입

> 하나의 프로퍼티에 다양한 변수가 올 수 있는 타입  

```tsx
let args: number | string;
// 위에서 변수 args는 숫자 값으로도 할당할 수 있고 문자열로도 할당할 수 있습니다.

let arg: "a" | "b" | "c"
// 또한 enum값도 union타입으로 표현할 수 있습니다. args 변수는 문자열 a, b, c값만을 할당할 수 있습니다.
```

---

## keyof 키워드

> 타입 값에 존재하는 모든 프로퍼티의 키값을 union 형태로 리턴  

```tsx
interface Todo {
    id: number;
    text: string;
    due: Date;
}

// TodoKeys의 타입 = "id" | "text" | "due"
type TodoKeys = keyof Todo;
```

---

## never 타입

> 에러가 발생했을 때 프로세스를 중단시키지 않고 무시하는 타입, any를 제외한 다른 모든 타입의 원시 타입으로 사용 가능  
타입이기는 하지만 실제 never 타입으로 변수를 선언할 수 없고, 주로 함수의 리턴 타입으로 에러가 발생할 경우 에러를 무시하고 계속 진행시키는 역할

---

## Partial<T>

> T의 모든 프로퍼티를 Optional 형태로 리턴  

```tsx
type Partial<T> = { [P in keyof T]?: T[P]; };

오른쪽에서 P in keyof T는 타입 T의 프로퍼티 키값에 해당하는 P를 전부 옵셔널형태로 감싸 리턴
```

### 예시 1

```tsx
interface User {
    name: string;
    age: number;
}

let user1: User = {name: 'harry', age: 23} //OK
let user2: User = {age: 23} // 에러발생

let user2: Partial<User> = {age: 23} // OK

// Partial은 타입은 원시 타입에 해당하는 프토 퍼티 값을 할당할 수도 안 할 수도 있지만 원시 타입에 존재하지 않는 값은 할당할 수 없습니다.
```

### 예시 2

```tsx
interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    // todo, fieldToUpdate 두개 모두 값이 있을경우 오른쪽 값이 할당됩니다.
    return {...todo, ...fieldsToUpdate}
}

const todo1 = {
    title: 'organize desk',
    description: 'clear clutter',
}

const todo2 = updateTodo(todo1, {
    description: 'throw out trash',
})

위와 같이 destructing을 이용하여 원하는 필드만 값을 변경할 수 있습니다.
```

---

## Require<T>

> 모든 Optional 타입들을 언랩핑합니다.

```tsx
type Required<T> = {
    [P in keyof T]-?: T[P];
};

마이너스 연산자는 옵셔널을 제거해주는 연산자입니다.
```

```tsx
type MutableRequired<T> = { -readonly [P in keyof T]-?: T[P] };  // readonly, optional 제거 
type ReadonlyPartial<T> = { +readonly [P in keyof T]+?: T[P] };  // readonly, optional 추가
```

### 예시 1.

```tsx
interface Props {
    a?: number;
    b?: string;
};

const obj: Props = { a: 5 }; // OK

const obj2: Required<Props> = { a: 5 }; // 에러발생
```

---

## Readonly<T>

> 모든 프로퍼티를 값을 참조만 할 수 있도록 함.

```tsx
type Readonly<T> = { readonly [P in keyof T]: T[P];};

Partial과 비슷하지만 옵셔널이 아닌 readonly 키워드를 사용합니다.
```

### 예시 1.

```tsx
interface Card {
    name: string;
    price: number
}

type readOnlyCard = Readonly<Card>;
let readonlyUser: readOnlyCard = {name: 'Sonata', price: 10000}
readonlyUser.price = 3 // 에러발생
```

---

## Record<K, T>

> K타입을 Key값 타입으로, T타입을 밸류 값 타입으로 갖는 타입을 리턴합니다.

```tsx
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

타입 K와 T를 받아 타입 K를 프로퍼티 키값으로 하는 타입을 만들 수 있습니다.
주로 K에 유니온 문자열 값을 주어 map 형식의 타입을 만들 수 있고 여러 값들을 원하는 키값에 따라 분류할 때 유용합니다.
```

### 예시 1.

```tsx
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
```

### 응용

```tsx
type memo = { content: string, date: string }

const FRIENDS_LIST = ["harry", "jason", "dukkey"] as const

type FriendTypeArray = typeof FRIENDS_LIST[number];

type friendType = Record<FriendTypeArray, memo>
```

---

## Pick<T, K>

> T 타입으로부터 K 프로퍼티만 추출합니다.

```tsx
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

키값 T에 속하는 유니온 타입 K를 받아(= K extends keyof T) 매칭 되는 프로퍼티만 리턴합니다.( = [P in K: T [P])
```

### 예시

```tsx
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
};
```

---

## Exclude<T, U>

> T 타입들중 U타입들과 겹치는 타입을 제외합니다.

```tsx
type Exclude<T, U> = T extends U ? never : T;

타입 T가 타입 U를 상속하거나 동일 타입이라면 무시(never)하고 아닐 경우 타입 값을 리턴합니다.
타입 T 또는 타입 U가 유니온 타입으로 온다면 각각의 교집합이 무시(never)됩니다.
```

### 예시 1.

```tsx
type T0 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;  // "c"
type T2 = Exclude<string | number | (() => void), Function>;  // string | number
```

---

## Extract<T, U>

> T타입에서 U타입과 겹치는 타입만을 가져옵니다.

```tsx
type Extract<T, U> = T extends U ? T : never;

Exclude와 거의 비슷하지만 T와 never의 위치만 다르기 때문에 교집합을 리턴합니다.
```

### 예시

```tsx
type T0 = Extract<"a" | "b" | "c", "a" | "f">;  // "a"
type T1 = Extract<string | number | (() => void), Function>;  // () => void
```

---

## Omit<T, K>

> Pick과는 정반대로 T타입으로부터 K프토퍼티를 제거합니다.

```tsx
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```

```tsx
type Car = {
    name: string;
    price: number;
    brand: string;
};

//Car에 속하는 Key값들중 brand를 키값으로 갖지않는 프로퍼티들을 
//RemainingKey에 넣습니다.
type RemainingKeys = Exclude<keyof Car, "brand">;

//Car에서 RemaningKeys에 속하는 키값에 속하는 프로퍼티들을 리턴합니다 
type NoBrandCard = Pick<Car, RemainingKeys>;
//결과 type NoBrandCard = { name: string; age: number; };
```

### 예시

```tsx
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface Test {
    a: string;
    b: number;
    c: boolean;
}

type OmitA = Omit<Test, "a">;      // Equivalent to: {b: number, c: boolean}
type OmitAB = Omit<Test, "a"|"b">; // Equivalent to: {c: boolean}
```

---

## NonNullable<T>

> T타입에서 null or undefinded을 제외하고 리턴합니다.

```tsx
type NonNullable<T> = T extends null | undefined ? never : T;

null 혹은 undefined 타입이거나 상속한다면 무시(never) 아니라면 타입을 리턴합니다.
```

### 예시

```tsx
type T0 = NonNullable<string | number | undefined>;  // string | number

type T1 = NonNullable<string[] | null | undefined>;  // string[]
```

---

## Parameters<T>

> 함수의 파라미터를 타입으로 리턴합니다.

```tsx
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

T는 (…args: any) => any로 선언되어있습니다.
모든 파라미터를 인자로 받고 결괏값으로 모든 값을 리턴하기 때문에 사실상 모든 함수를 상속합니다.

infer 키워드는 타입 스크립트가 엔진이 런타임 상황에서 타입을 추론할 수 있도록 하고 그 값을 P에 할당해줍니다.
파라미터 타입을 infer P로 할당하고 함수의 형태가 참이라면 파라미터를 아니라면 무시(never)합니다.
```

### 예시

```tsx
declare function f1(arg: { a: number, b: string }): void
type T0 = Parameters<() => string>;  // []
type T1 = Parameters<(s: string) => void>;  // [string]
type T2 = Parameters<(<T>(arg: T) => T)>;  // [unknown]
type T4 = Parameters<typeof f1>;  // { a: number, b: string }
type T5 = Parameters<any>;  // unknown[]

// never는 any를 제외한 모든 타입의 원시타입이기때문에
// 함수타입 T에 never로 주어도 에러가 발생하지 않고
// 인자값으로도 어떠한 값이든 올 수 있기때문에 any가 리턴됩니다.
type T6 = Parameters<never>;  // any

// T extends (...args: any) => any에서
// never 타입을통해 에러를 막지않았기떄문에 함수가 아니라면 에러가 발생합니다.
type T7 = Parameters<string>;  // Error
type T8 = Parameters<Function>;  // Error
```

### any와 never 모두 함수를 대신하여 파라미터 타입으로 사용할 수 있기 때문에 에러가 발생하지 않습니다.

---

## ConstructorParameters<T>

> 생성자를 갖는 함수 타입의 생성자 파라미터를 리턴합니다. 함수가 아니라면 never를 리턴합니다.

```tsx
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;

위의 parameters와 비슷하지만 new키워드를 추가하여 생성자 파라미터로 한정하였습니다.
```

### 예시

```tsx
class Person {
    private _firstname: string
    private _lastname: string

    constructor(firstname: string, lastname: string) {
        this._firstname = firstname
        this._lastname = lastname
    }
}

type constructuinArgsType = ConstructorParameters<typeof Person>;
let personConstructionArgs: constructuinArgsType = ['first', 'last']
```

---

## ReturnType<T>

> 함수의 리턴타입을 가져옵니다.

```tsx
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

parameter와 비슷하지만 타입 추론(infer)을 함수의 결괏값에 할당한 후 리턴합니다.
```

### 예시

```tsx
let f1 = () => ({ a: 23, b: 33 });

type T0 = ReturnType<() => string>;  // string

type T1 = ReturnType<(s: string) => void>;  // void

type T2 = ReturnType<(<T>() => T)>;  // {}

type T3 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]

type T4 = ReturnType<typeof f1>;  // { a: number, b: string }
```

---

## InstanceType<T>

> 생성자로 초기화된 인스턴스 타입을 리턴합니다.

```tsx
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;

타입 추론(infer)을 인스턴스 값에 할당한 후 리턴하였습니다.
```

### 예시

```tsx
let funTest = () => ({ a: 23, b: 33 });

type T0 = ReturnType<() => string>;  // string

type T1 = ReturnType<(s: string) => void>;  // void

type T2 = ReturnType<(<T>() => T)>;  // {}

type T3 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]

type T4 = ReturnType<typeof funTest>;  // { a: number, b: string }

type T5 = ReturnType<any>;  // any

type T6 = ReturnType<never>;  // any
```