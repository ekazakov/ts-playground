import { random } from 'lodash';

class Person {
    foo: number = 4;

    doo(x: number) {
        if (x > 2) {
            return { y: 1};
        }

        return null;
    }

    baz() {
        const obj = this.doo(1);

        if (obj) {
            console.log(obj.y, random(2, 4, false));
        }
    }
}

export default Person;

enum Animals {Cat = 'cat', Dog = 'dog', Horse = 'horse'};

const avav: Animals = Animals.Cat;

console.log('avav', avav);

let someValue: any = 'Fooo';
const size = (someValue).length;

console.log('size', size + 1);