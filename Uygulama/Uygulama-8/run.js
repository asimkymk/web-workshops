let Person = function (name) {
    this.name = name;
}
Person.prototype.introduce = function () {
    return "Hello my name is " + this.name;
}

let Student = function (name, number) {
    Person.call(this, name);
    this.number = number;

}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.study = function () {
    return "Here " + " are my lessons number!";
}
let Teacher = function (name, branch) {
    Person.call(this, name);
    this.branch = branch;
}

Teacher.prototype = Object.create(Person.prototype);
Teacher.prototype.constructor = Teacher;

Teacher.prototype.teach = function () {
    return "I teach " + this.branch;
}

let HeadMaster = function (name, branch) {
    Teacher.call(this, name, branch);
}

HeadMaster.prototype = Object.create(Teacher.prototype);
HeadMaster.prototype.constructor = HeadMaster;
HeadMaster.prototype.shareTask = function () {
    return "Hmm ok";
}

var emel = new HeadMaster("emel", "matematik");
console.log(emel.teach());




