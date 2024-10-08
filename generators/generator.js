/* function* simpleGen(){
    yield 'Hello';
    yield 'WORLD';
}

const genObject = simpleGen();

console.log(genObject.next().value); */

//console.log(genObject.next().value);


/* function* numberGenerator(){
    let number = 1;
    while (true) {
        yield number ++;
    }
}

const numIterator = numberGenerator();
console.log(numIterator.next().value);
console.log(numIterator.next().value);
console.log(numIterator.next().value);
console.log(numIterator.next().value);
console.log(numIterator.next().value);
console.log(numIterator.next().value);
console.log(numIterator.next().value);
console.log(numIterator.next().value);
console.log(numIterator.next().value);
console.log(numIterator.next().value);
console.log(numIterator.next().value); */


/* function* numberGenerator(){
    yield 1;
    yield 2;
}
const gen = numberGenerator();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next()); */

/* function* dataProcessor(){
    const data = yield 'Please prrovide data';
    yield `Processed ${data}`;
    return `Processed `;
}

const processor = dataProcessor();
console.log(processor.next().value);

console.log(processor.next().value);

console.log(processor.next().value); */

function* numberGenerator(){
    yield 1;
    yield 2;
    yield 3;
}

function* combinedGenerator(){
    yield* numberGenerator();
    yield ['a','b','c'];
}
const combined = combinedGenerator();


for (const element of combined) {
    console.log(element);
}

