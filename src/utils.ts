import { random } from 'lodash';
export default function superMath(a: number, b: number): number {
    return a + b;
}

type smth = string | { name: string }

const foo = (param: smth | null) => {
    if (typeof param === 'string') {
        return param.name;
    } else if (param !== null && typeof param === 'object' && name in param) {
        return param.name;

    }
};

const bar = (a: number) => a > 2 ? String(a) : null;
foo(bar(1));

type persons = 'Mike' | 'Mouse' | 'Mikky';
const foo2 = (str: persons) => console.log(str);

console.log(foo2('Greg'));
console.log(foo2('Mike'));

let num = 10;
let numType: typeof num = '1';
console.log('numType:', numType);

const addToCollection = <T>(collection: T[], item: T) => {
    collection.push(item);
};


addToCollection<string>(['a', '1'], 'c');

interface Crocodile { personality: string; }
interface Taxes { year: number; }
interface Container<T> { unit: T; }


let crocContainer: Container<Crocodile> = { unit: { personality: 'sdff' } };
let taxContainer: Container<Taxes> = { unit: { year: 2018 } };

interface RedCroc extends Crocodile {color: 'red';}
interface BlueCroc extends Crocodile {color: 'blue';}
interface CrocContainer<T extends Crocodile> { crocUnit: T; }

let redCrocContainer: CrocContainer<RedCroc> = {crocUnit: {personality: 'dfdf', color: 'red'}};

interface Arr<T> extends Array<any> {
    [index:number]: T | MyArr<T>
}

type MyArr<T> = (T | Arr<T>)[]


function flatten<T>(array: MyArr<T>): T[] {
    const result: T[] = [];

    for (const element of array) {
        if (Array.isArray(element)) {
            result.push(...flatten(element));
        } else {
            result.push(element);
        }
    }

    return result;
}
const items = [1, 2, 3, [4,5, [10, [11]]], 6, [7, 8, 9]];
const items2 = ['1', '2', '3', ['4','5', ], ];
console.log(flatten<number>(items));
console.log(flatten<string>(items2));

function isFlat<T>(array: (T | T[])[]): array is T[] {
    return !array.some(Array.isArray)
}

const items3 = [1,2,3, [4]];
if (isFlat(items3)) {
     console.log('items3[0] + items3[1]:', items3[0] + items3[1]);
}

interface User {
    readonly id: number,
    name: string,
}

const u: User = { id: 1, name: 'Mike' };
u.id++;
u.name += ' Mouse';

const days: ReadonlyArray<string> = ['Monday', 'Tuesday'];
days[0] = 'Foo';
console.log('days:', days);

const obj: { [key: string]: any } = {};

obj.hasOwnProperty('foo');
obj.foo = 2;

enum Sizes { S, M, L, XL }

function assertNever(value: never): never {
    throw Error(`Unexpected value: ${value}`);
}

function prettyPrint(size: Sizes): string {
    switch(size) {
        case Sizes.S: return 'small';
        case Sizes.M: return 'medium';
        case Sizes.L: return 'large';
        // case Sizes.XL: return 'Xlarge';
        default: return assertNever(size);
    }
}

function reverse(string: string): string;
function reverse<T>(array: T[]): T[];
function reverse(stringOrArray: string | any[]) {
    return typeof stringOrArray === "string"
        ? [...stringOrArray].reverse().join("")
        : stringOrArray.slice().reverse();
}

const str = reverse('TypeScript');
console.log(str.toLowerCase());
const items4 = reverse<string>(['1', '2', '4']);
console.log(items4[0] + items4[1]);

let fuzz: 'on' | 'off' = 'on';
fuzz = 'on';

type Result<T> =
    | { success: true; value: T; }
    | { success: false; error: string; };

function tryParseInt(text: string): Result<number> {
    if (/^-?\d+$/.test(text)) {
        return {
            success: true,
            value: parseInt(text, 10)
        };
    }
    return {
        success: false,
        error: "Invalid number format"
    };
}

const num2 = tryParseInt('42');
console.log('num:', num2);

if (num2.success) {
    num2.error;
}


interface Cash {
    kind: "cash";
}

interface PayPal {
    kind: "paypal";
    email: string;
}

interface CreditCard {
    kind: "creditcard";
    cardNumber: string;
    securityCode: string;
}

type PaymenMethod = Cash | PayPal | CreditCard;

function stringifyPaymentType(method: PaymenMethod) {
    switch (method.kind) {
        case 'cash': return 'cash';
        case 'paypal': return 'paypal';
        case 'creditcard': return 'creditcard';
    }
}

interface Response {
    data?: { user: string, }
    code: number,
}

const res: Response = (() => {
    return random(0, 10) >= 5 ?
        { code: 0} : { code: 1, data: { user: 'Mike' }};
})();

console.log('res', res.data.user);


interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const todo: Todo = {
    id: 1,
    text: "Buy milk",
    completed: false
};

function prop<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

type TodoId = Todo['id']

const id = prop(todo, "id");
const text = prop(todo, "text");
const completed = prop(todo, "completed");
// const dueDate = prop(todo, 'dueDate');


interface Point {
    x: number;
    y: number;
}

interface Optional {
    [key: string]: any
}

type XPoint = Readonly<Point> & Optional;

// type ReadonlyPoint = Readonly<Point>;
type ReadonlyPoint = {
    readonly [P in keyof Point]: Point[P];
    // readonly x: number;
    // readonly y: number;
};


const point: ReadonlyPoint = { x: 1, y: 2 };
// point.z += 1;
const point2: XPoint = { x: 1, y: 2, z: 3 };
point2.z = 2;

type Tree<T> = {
    value: T;
    left?: Tree<T>;
    right?: Tree<T>;
}

const t: Tree<number> = {
    value: 0,
    left: {
        value: 1,
        right: {
            value: 2
        }
    }
};



console.log(id);
console.log(text);
console.log(completed);