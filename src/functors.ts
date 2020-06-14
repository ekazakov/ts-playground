const double = (x:number) => x * 2;
const hello = (x:string) => `Hello ${x}`;
const conversion = (x: number) => `Hello ${x.toString()}`;
const rnd = (x: string | number) => x;

type Fn<T, R> = (x: T) => R;

interface Mappable<T> {
    map: <R>(fn: Fn<T,R>) => Mappable<R>;
    valueOf: () => T;
}

const identity = <T>(value: T): Mappable<T> => ({
    map: <R>(fn: Fn<T,R>): Mappable<R> => identity(fn(value)),
    valueOf: () => value
});


const a = identity(3);
const b = a.map(double);
const vB = b.valueOf();
console.log(vB); // 6

const c = identity('cat');
// @ts-ignore
const d = c.map(double);
const vD = d.valueOf();
console.log(vD);

const e = c.map(hello);
const vE = e.valueOf();
console.log(vE); // Hello cat

const f = a.map(conversion);
const vF = f.valueOf();
console.log(vF); // Hello 3

const g = a.map(double).map(conversion);
const gF = g.valueOf();
console.log(gF); // Hello 6


const k = identity(3);
const k2 = k.map(rnd)
let k3 = identity(3);

// @ts-ignore
k3 = k2;



