from django.contrib import messages
from django.shortcuts import redirect, render,HttpResponse
from .forms import ArticleForm
from .models import Article
# Create your views here.



def index(request):
    articles = Article.objects.all()
    return render(request,'articles.html',{'articles':articles})

def about(request):
    return render(request=request,template_name="about.html")

def detail(request,id):
    return HttpResponse('ID : '  + str(id))

def dashboard(request):
    articles = Article.objects.filter(author=request.user)
    return render(request,'dashboard.html',{'articles':articles})

def addarticle(request):
    
    form = ArticleForm(request.POST or None,request.FILES or None)
    context ={
        'form':form
    }
    if form.is_valid():
        title =  form.cleaned_data.get('title')
        content = form.cleaned_data.get('content')
        article_image = form.cleaned_data.get('article_image')
        article = Article(author=request.user,title = title,content=content,article_image=article_image)
        article.save()
        messages.success(request,"Makaleniz başarıyla eklendi.")
        articles = Article.objects.filter(author=request.user)
        return render(request,'dashboard.html',{'articles':articles})
        


    
    return render(request,'addarticle.html',context)

def viewarticle(request,id):
    article = Article.objects.filter(id=int(id))
    if len(article) == 0:
        messages.warning(request,"Erişmek istediğiniz makale bulunamadı.")
        articles = Article.objects.all()
        return render(request,'articles.html',{'articles':articles})
    context ={
        'article':article[0]
    }
    return render(request,'article.html',context)
