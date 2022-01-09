from flask import Flask,render_template,flash,redirect,url_for,session,logging,request
from flask_mysqldb import MySQL
from wtforms import Form,StringField,TextAreaField,PasswordField,validators
from passlib.hash import sha256_crypt
import hashlib
from functools import wraps

#Kullanıcı Kayıt Form Class

class RegisterForm(Form):
    name = StringField("İsminiz : ",validators=[validators.Length(min=4,max=25),validators.DataRequired()])
    username = StringField("Kullanıcı Adı : ",validators=[validators.Length(min=7,max=35),validators.DataRequired()])
    email = StringField("E-mail : ",validators=[validators.Length(min=10,max=55),validators.DataRequired(),validators.Email(message="Lütfen geçerli bir mail adresi giriniz.")])
    password = PasswordField("Parola : ",validators=[validators.Length(min=8,max=25),
                                                    validators.DataRequired(message="Lütfen paralo belirleyiniz."),
                                                    validators.EqualTo(fieldname = "confirm",message="Parolanız uyuşmuyor.")])
    confirm = PasswordField("Parola Tekrar : ")

class LoginForm(Form):
    username = StringField("Kullanıcı Adı : ")
    password = PasswordField("Parola : ")




app = Flask(__name__)
app.secret_key = "ybblog"
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = ""
app.config["MYSQL_DB"] = "ybblog"
app.config["MYSQL_CURSORCLASS"] = "DictCursor"

mysql = MySQL(app)
@app.route('/')
def index():
   
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/articles")
def articles():
    cursor = mysql.connection.cursor()
    sorgu = "select * from articles"
    result = cursor.execute(sorgu)
   
        
    if result > 0:
        data = cursor.fetchall()
        return render_template("articles.html",articles = data)
    else:
        return render_template("articles.html")


@app.route("/article/<string:id>")
def detail(id):
    cursor = mysql.connection.cursor()
    sorgu = "select * from articles where id = %s"
    result = cursor.execute(sorgu,(id,))
    if result > 0:
        article = cursor.fetchone()
        return render_template("article.html",article=article)
    else:
        return render_template("article.html")
@app.route("/register",methods=["GET","POST"])
def register():
    form = RegisterForm(request.form)

    if request.method == "POST" and form.validate():
        name = form.name.data
        username = form.username.data
        email = form.email.data
        password = form.password.data
        password = hashlib.sha256(password.encode())
        password = password.hexdigest()
        
        cursor = mysql.connection.cursor()

        sorgu = "insert into users (name,email,username,password) values(%s,%s,%s,%s)"

        cursor.execute(sorgu,(name,email,username,password))
        mysql.connection.commit()
        cursor.close()
        flash("Başarıyla kayıt olundu.",category="success")
        return redirect(url_for("login"))
    else:
        
        return render_template("register.html",form=form)

#Kullanıcı Giriş Decoratır

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "logged_in" in session:
            
            return f(*args, **kwargs)
        else:
            flash("Sayfayı görüntüleyebilmek için lütfen giriş yapınız.",category="danger")
            return redirect(url_for("login"))
    return decorated_function

#Login

@app.route("/login",methods=["GET","POST"])
def login():
    form = LoginForm(request.form)
    if request.method == "POST" and form.validate():
        
        username = form.username.data
        password = form.password.data
        password = hashlib.sha256(password.encode())
        password = password.hexdigest()
        cursor = mysql.connection.cursor()
        
        sorgu = "select * from users where username = %s"
        
        result = cursor.execute(sorgu,(username,))
        if result > 0:
            data = cursor.fetchone()
            
            control_password = data["password"]
            if password == control_password:
                flash("Başarıyla giriş yapıldı.",category="success")

                session["logged_in"] = True
                session["username"] = username

                return redirect(url_for("index"))
            else:
                
                flash("Hatalı şifre giriş yapıldı.",category="danger")
                return redirect(url_for("login"))
        else:
            flash("Böyle bir kullanıcı bulunmuyor.",category="danger")
            return redirect(url_for("login"))
        
    else:
        
        return render_template("login.html",form=form)

@app.route("/logout")
def logout():
    session.clear()

    return redirect(url_for("index"))

@app.route("/dashboard")
@login_required
def dashboard():
    cursor = mysql.connection.cursor()
    sorgu = "select * from articles where author = %s"
    result = cursor.execute(sorgu,(session['username'],))
    if result > 0:
        return render_template("dashboard.html",myarticles=cursor.fetchall())
    else:

        return render_template("dashboard.html")
#Makale Form
class ArticleForm(Form):
    #title = StringField("Makale Başlığı",validators=[validators.DataRequired(),validators.Length(min=5,max=55)])
    #content = TextAreaField("Makale İçeriği",validators=[validators.Length(min=10)])
    title = StringField("Makale Başlığı")
    content = TextAreaField("Makale İçeriği")

@app.route("/addarticle",methods=["GET","POST"])
@login_required
def addarticle():
    form = ArticleForm(request.form)
    if request.method == "POST" and form.validate():
        title = form.title.data
        content = form.content.data
        username = session["username"]
        cursor = mysql.connection.cursor()
        sorgu = "insert into articles (title,author,content) values(%s,%s,%s)"
        cursor.execute(sorgu,(title,username,content))
        mysql.connection.commit()
        cursor.close()
        flash("Makale başarıyla eklendi",category="success")
        return redirect(url_for("dashboard"))
    else:

        return render_template("addarticle.html",form=form)

#Makale Silme
@app.route("/delete/<string:id>")
@login_required
def delete(id):
    cursor = mysql.connection.cursor()
    sorgu = "select * from articles where author = %s and id = %s"
    result = cursor.execute(sorgu,(session['username'],id))
    if result > 0:
        sorgu2 = "delete from articles where id = %s"
        cursor.execute(sorgu2,(id,))
        mysql.connection.commit()
        cursor.close()
        flash("Makale başarıyla silindi",category="success")
        return redirect(url_for("dashboard"))
    else:
        flash("Böyle bir makale zaten bulunmuyor.",category="danger")
        return redirect(url_for("index"))

#Makale Güncelleme 
@app.route("/edit/<string:id>",methods=["GET","POST"])
@login_required
def edit(id):
    form = ArticleForm()
    cursor = mysql.connection.cursor()
    if request.method == "POST" and form.validate():
            form = ArticleForm(request.form)
            newtitle = form.title.data
            newcontent = form.content.data
            sorgu2 = "UPDATE articles SET title = %s, content = %s where id = %s"
            cursor.execute(sorgu2,(newtitle,newcontent,id))
            mysql.connection.commit()
            cursor.close()
            flash("Makaleniz başarıyla güncellendi",category="success")
            return redirect(url_for("dashboard"))
    else:
        
        sorgu = "select * from articles where id = %s and author = %s"
        result = cursor.execute(sorgu,(id,session["username"]))
        if result > 0:
            
            article = cursor.fetchone()
            form.title.data = article['title']
            form.content.data = article["content"]
            return render_template("edit.html",form=form)
    
        else:
            flash("Böyle bir makale bulunamadı veya bu makale size ait değil. Lütfen daha sonra tekrar deneyiniz.",category="danger")
            return redirect(url_for("dashboard"))
        

    
    
#search 
@app.route("/search",methods=["GET","POST"])
def search():

    if request.method == "GET":
        flash("Herhangi bir arama değeri girmediniz.",category="danger")
        return redirect(url_for("index"))
    else:
        keyword = request.form.get('aranankelime')
        cursor = mysql.connection.cursor()
        print(keyword)
        sorgu = "select * from articles where title like '%" + keyword +"%'"

        result = cursor.execute(sorgu)

        if result == 0:
            flash("Aranan kelimeye uygun makale bulunamadı.",category="danger")
            return redirect(url_for("articles"))
        else:
            articles = cursor.fetchall()
            return render_template("search.html",articles=articles,aranankelime=keyword)





if __name__ == '__main__':
    app.run(debug=True)
