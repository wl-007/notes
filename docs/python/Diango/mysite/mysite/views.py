from django.shortcuts import render,HttpResponse

# Create your views here.
def first_test(request):
    print('第一个Django项目views')
    return HttpResponse('Django项目第一次请求成功')

def login_html(request):
    print(dir(request))
    html = '''
    <html>
       <body>
           <form method="post">
           用户名:<input name = "username" type="text"></input></br>
           密码：<input name = "password" type = "password"></input></br>
           <input type="submit" value="登录"></input>
          </form>
       </body>
    </html>
    '''
    return HttpResponse(html)