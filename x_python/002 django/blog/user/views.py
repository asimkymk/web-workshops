from django.shortcuts import render,redirect
from .forms import RegisterForm, LoginForm
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib import messages
from django.contrib import auth
from django.contrib.auth import authenticate,logout
# Create your views here.
def register(request):
    form = RegisterForm(request.POST or None)
    if request.user.is_authenticated:
        messages.warning(request,"Sisteme zaten giriş yaptınız.")
        return redirect('index')
    if form.is_valid():
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password')
        user = User(username=username)
        user.set_password(password)
        user.save()
        auth.login(request,user)
        messages.success(request,"Başarıyla kayıt oldunuz.")
        return redirect('index')
        
    context = {
        "form":form
    }
    
    return render(request,'register.html',context)

    

    """
    
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = User(username=username)
            user.set_password(password)
            user.save()
            auth.login(request,user)
            return redirect('index')
        else:
            form = RegisterForm()
            
            context = {
                "form":form
            }
            return render(request,'register.html',context)

    else:
        form = RegisterForm()
        context = {
            "form":form
        }
        
        return render(request,'register.html',context)"""

    

def login(request):
    form = LoginForm(request.POST or None)

    context = {
        "form":form
    }
    if request.user.is_authenticated:
        messages.warning(request,"Sisteme zaten giriş yaptınız.")
        return redirect('index')

    if form.is_valid():
        username = form.cleaned_data.get("username")
        password = form.cleaned_data.get("password")

        user = authenticate(username = username,password = password)

        if user is None:
            messages.info(request,"Kullanıcı Adı veya Parola Hatalı")
            return render(request,"login.html",context)

        messages.success(request,"Başarıyla Giriş Yaptınız")
        auth.login(request,user)
        return redirect("index")
    return render(request,"login.html",context)

def logout(request):
    auth.logout(request)
    messages.warning(request,"Sistemden çıkış yapıldı.")
    return render(request,"index.html")