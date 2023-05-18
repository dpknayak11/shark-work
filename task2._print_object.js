class Student{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
   info = () => {
            console.log(this.name);
            console.log(this.age);
        }
}
const sts1 = new Student('Rahul', 21);
sts1.info();
const sts2 = new Student('Vishal', 22);
sts2.info();
