from flask import Flask,render_template,redirect,url_for,request,session,flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.engine import url

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////Users/asimk/Desktop/web/x_python/001 flask/toDo/todo.db'
db = SQLAlchemy(app)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

class ToDo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))
    complete = db.Column(db.Boolean)

@app.route("/")
def index():
    todos = ToDo.query.all()


    return render_template("index.html",todos = todos)

@app.route("/add",methods=["GET","POST"])
def add():
    if request.method == "GET":
        flash("Lütfen bir değer giriniz. ",category="danger")
        return redirect(url_for("index"))
    else:
        title = request.form.get('title')
        newToDo = ToDo(title=title,complete=False)
        db.session.add(newToDo)
        db.session.commit()
        return redirect(url_for("index"))

@app.route("/delete/<int:id>")
def delete(id):
    ToDo.query.filter_by(id=id).delete()
    db.session.commit()
    flash("ToDo başarıyla silindi.",category="success")
    return redirect(url_for("index"))

@app.route("/complete/<int:id>")
def complete(id):
    todo = ToDo.query.filter_by(id=id).first()
    todo.complete = True
    db.session.commit()
    return redirect(url_for("index"))
@app.route("/uncomplete/<int:id>")
def uncomplete(id):
    todo = ToDo.query.filter_by(id=id).first()
    todo.complete = False
    db.session.commit()
    return redirect(url_for("index"))

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)