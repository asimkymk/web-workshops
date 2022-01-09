function Course(title, instructor, image) {
    this.courseId = Math.floor(Math.random() * 10000);
    this.title = title;
    this.instructor = instructor;
    this.image = image;

}

//local storage

class Storage {
    static getCourses() {
        let courses;
        if (localStorage.getItem("courses") === null) {
            courses = [];
        } else {
            courses = JSON.parse(localStorage.getItem("courses"));

        }
        return courses;

    }

    static displayCourse() {
        const courses = Storage.getCourses();
        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);
        })

    }

    static addCourse(course) {
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem("courses", JSON.stringify(courses));

    }

    static deleteCourse(element) {
        if (element.classList.contains("delete")) {
            const id = element.getAttribute("data-id");
            const courses = Storage.getCourses();
            courses.forEach((course, index) => {
                if (course.courseId == id) {
                    courses.splice(index, 1);
                }
            });
            localStorage.setItem("courses", JSON.stringify(courses));
        }

    }
}


//uı constructor

function UI() {

}

UI.prototype.addCourseToList = function (course) {
    const list = document.getElementById("course-list");
    var html = `
        <tr>
        <td><img src="img/${course.image}" alt=""></td>
        <td>${course.title}</td>
        <td>${course.instructor}</td>
        <td><a href="" data-id ="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
        `;


    console.log(html);

    list.innerHTML += html;
}
UI.prototype.deleteCourse = function (e) {
    if (e.classList.contains("delete")) {
        e.parentElement.parentElement.remove();
    }

}


UI.prototype.clearControls = function () {
    const title = document.getElementById("title").value = "";
    const instructor = document.getElementById("instructor").value = "";
    const image = document.getElementById("image").value = "";
}

UI.prototype.showAlert = function (message, className) {
    var alert = `
       <div class="alert alert-${className}">
            ${message}
       </div>
    `;
    const row = document.querySelector(".row");
    row.insertAdjacentHTML("BeforeBegin", alert);
    setTimeout(() => {
        document.querySelector(".alert").remove();
    }, 3000);
}


document.getElementById("new-course").addEventListener("submit", function (e) {
    const title = document.getElementById("title").value;
    const instructor = document.getElementById("instructor").value;
    const image = document.getElementById("image").value;

    //create course object
    const course = new Course(title, instructor, image);

    //create UI
    const ui = new UI();
    if (title === '' || instructor === '' || image === '') {
        ui.showAlert("Please complete the form", "warning");
    } else {
        //add course to list
        ui.addCourseToList(course);

        //save to Local Storage

        Storage.addCourse(course);

        //clear controls
        ui.clearControls();

        ui.showAlert("The course has been added successfuly", "success");

        console.log(title, instructor, image);
    }


    e.preventDefault();
})

document.getElementById("course-list").addEventListener("click", function (e) {
    const ui = new UI();
    ui.deleteCourse(e.target);
    ui.showAlert("The course has been deleted", "danger");
    //delete course from Local Storage

    Storage.deleteCourse(e.target);
    e.preventDefault();
})

document.addEventListener("DOMContentLoaded", Storage.displayCourse());