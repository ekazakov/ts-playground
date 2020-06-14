type X = Promise<string>;
type Y = Promise<{ field: number }>;


type Transform<A> = A extends Promise<infer U> ?  U : A;

type ResultX = Transform<X>
type ResultY = Transform<Y>


type AppendArg<F extends (...args: any) => any, A> = (x: A, ...args: Parameters<F>) => ReturnType<F>;

type FinalF = AppendArg<(a: number, b: string) => number, boolean>

type AppendArg2<F, A> = F extends (...args: infer Args) => infer Return ?
    (x: A, ...args: Args) => Return : never;

type FinalF2 = AppendArg2<(a: number, b: string) => number, boolean>


type Config = {
    name: boolean;
    lastname: boolean;
};
type User = {
    name?: string;
    lastname?: string;
};

type OptionalFields<T extends Config> = {
    [K in keyof T]: T[K] extends false ? K : never
}[keyof T];

type Result<C extends Config> = Required<Omit<User, OptionalFields<C>>>;

type TKey = keyof { name: true, lastname: false };
type TTG<T> = {[K in keyof T]: K}
type TTKey = TTG<{ name: true, lastname: false }>


// Here declaration to be changed 🔥
declare function getUser<C extends Config>(config: C): Result<C>;

// test cases
const user = getUser({ name: true, lastname: false })
user.name // this field should be non-optional
// user.lastname // this field should not be there and we should have compile error 🛑

const user2 = getUser({ name: true, lastname: true })
user2.name // this field should be non-optional
user2.lastname // this field should be non-optional

const user3 = getUser({ name: false, lastname: true })
// user3.name // this field should not be there and we should have compile error 🛑
user3.lastname // this field should be non-optional

const user4 = getUser({ name: false, lastname: false })
user4 // user4 should be empty object {}


type DeepFlat<T extends any[]> = {
    [K in keyof T]: T[K] extends any[] ? DeepFlat<T[K]> : T[K]
}[number];

type Naive = [['a'], ['b', 'c'], ['d'], [[['e']]]];
type NaiveResult = DeepFlat<Naive>
// should evaluate to "a" | "b" | "c" | "d" | "e"



type EmptyObject = {
    [K in PropertyKey]: never
} // empty object only, 🔥 change the type to be exclusive for any field

// test cases
const shouldPass: EmptyObject = {}; // this should be ok 🟢
const shouldFail: EmptyObject = {
    prop: 1 // here we should have compile error 🛑
}

type SomeType =  {
    prop: string;
}

type Exclusive<T1, T2 extends T1> = {
    [K in keyof T2]: K extends keyof T1 ? T2[K] : never;
}

// change below function type definition 🔥 in order to allow only strict SomeType value
function takeSomeTypeOnly<T extends SomeType>(x: Exclusive<SomeType, T>) {
    return x;
}

// test cases
const x = { prop: 'a' };
takeSomeTypeOnly(x) // this should be ok 🟢

const y = { prop: 'a', addditionalProp: 'x' };
takeSomeTypeOnly(y) // here we should have compile error 🛑


type Sick = {state: 'sick'}
type Healthy = {state: 'healthy'}
type Quarantine = {state: 'quarantaine'}

type Patient = {
    name: string
} & (Sick | Healthy | Quarantine);


type John = {name: 'John'} & Sick
type Tom = {name: 'Tom'} & Healthy
type Kate = {name: 'Kate'} & Sick
type Mike = {name: 'Mike'} & Quarantine
type Paul = {name: 'Paul'} & Healthy
type Doroty = {name: 'Doroty'} & Quarantine
type Gregory = {name: 'Gregory'} & Sick
type Pierce = {name: 'Pierce'} & Quarantine

// removes element on the beginning of the tuple
type Shift<T extends Array<any>> = ((...a: T) => any) extends ((a: any, ...result: infer Result) => any) ? Result : never;
// adds element on the beginning of the tuple
type Unshift<A, T extends Array<any>> = ((a: A, ...b: T) => any) extends ((...result: infer Result) => any) ? Result : never;

type CanMeet<A extends Patient, B extends Patient> = A extends Healthy ?
    (B extends Healthy ? true : false) :
    (A extends Sick ?
        (B extends Sick ? true : false):
        false);

type JohnWithTom = CanMeet<John, Tom> // false as one is sick and anothe is not
type JohnWithKate = CanMeet<John, Kate> // true as both are sick
type DorotyWithGregory = CanMeet<Doroty, Gregory> // false as people in quarantaine cannot meet anybody
type MikeWithTom = CanMeet<Mike, Tom> // false as people in quarantaine cannot meet anybody
type PaulWithTom = CanMeet<Paul, Tom> // true yes both are healty


type GetSick<
     Patients extends Patient[]
   , SickPats extends Patient[] = []
   , ReducedPats extends Patient[] = Shift<Patients>
> = {
    [K in keyof Patients]: Patients[K] extends Patient
        ? ReducedPats['length'] extends 0 ? Patients[K] extends Sick
        ? Unshift<Patients[K], SickPats> : SickPats
        : Patients[K] extends Sick ? GetSick<ReducedPats, Unshift<Patients[K], SickPats>>
        : GetSick<ReducedPats, SickPats>
        : never
}[0]

type Check1 = GetSick<[
    John,
    Tom,
    Kate,
]> // Check1 should be [John, Kate]
type Check2 = GetSick<[
    Gregory,
    Pierce,
    Kate,
    Paul
]> // Check2 should be [Kate, Gregory]
type Check3 = GetSick<[
    Tom,
    Paul
]> // Check3 should be []

type Get<Patients extends Patient[], T extends (Sick | Healthy | Quarantine)> = {
    [K in keyof Patients]: Patients[K] extends Patient
        ? Patients[K] extends T
        ? Patients[K]
        : never
        : never
}

type Check11 = Get<[Gregory, Pierce, Kate, Paul], Sick>;


type _Accomodate<Beds extends '🛌'[], Patients extends Patient[]>
    = Beds['length'] extends 0 ? Patients['length'] extends 0 ? true : false
    : Patients["length"] extends 0 ? true : { x: _Accomodate<Shift<Beds>, Shift<Patients>> };

type _TraverseA<T> = T extends object ? {
    [K in keyof T]: T[K] extends boolean ? T[K] : _TraverseA<T[K]>
}[keyof T] : T;

type CanAccomodate<
    Beds extends '🛌'[],
    Patients extends Patient[],
    _A = _Accomodate<Beds, Patients>>
    = _TraverseA<_A>

type Result1 = CanAccomodate<['🛌', '🛌'], [John, Tom]> // true, we have the same amount of beds
type Result2 = CanAccomodate<['🛌', '🛌'], [John]>  // true, we have more beds
type Result3 = CanAccomodate<[], [John]>  // false, we have no beds
type Result4 = CanAccomodate<['🛌', '🛌'], [John, Tom, Doroty]>  // false, we have less beds than patients

const concatToField =
    <T extends Record<K, string>, K extends keyof T>(obj: T, key: K, payload: string): T => {
        const prop = obj[key];
        return { ...obj, [key]: prop.concat(payload) }
    }
const test = { fieldStr: 'text', fieldNum: 1, fieldStr2: 'text' };
concatToField(test, 'fieldStr', 'test'); // should be ok 👌
concatToField(test, 'fieldNum', 'test'); // should be error fieldNum is not string field 🛑
concatToField(test, 'notExistingField', 'test'); // should be error - no such field 🛑
concatToField(test, 'fieldStr2', 'test'); // should be ok 👌


type NonEmptyArray<T> = [T, ...T[]]/* your type level code here 💪 */
const a1: NonEmptyArray<string> = [] // should be compilation error 🛑
const b1: NonEmptyArray<string> = ['Hi TS'] // should be ok! 👌
const c1: NonEmptyArray<string> = ['Hi TS', 'Foo'] // should be ok! 👌

declare const elem: HTMLElement;

type events = 'click' | 'blur' | 'mouseup';

function subscribe(el: HTMLElement, type: events, cb: (...args: any[]) => any ) {
    el.addEventListener('type', cb);
}

subscribe(elem, 'click', () => {});
subscribe(elem, 'clickk', () => {});
