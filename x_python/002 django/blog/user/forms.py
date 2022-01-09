from django import forms

class LoginForm(forms.Form):
    username = forms.CharField(max_length=50,label="Kullanıcı Adı : ")
    password = forms.CharField(max_length=20,label="Parola",widget=forms.PasswordInput)
    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'

class RegisterForm(forms.Form):

    username = forms.CharField(max_length=50,label="Kullanıcı Adı : ")
    password = forms.CharField(max_length=20,label="Parola",widget=forms.PasswordInput)
    confirm = forms.CharField(max_length=20,label="Parola Doğrula",widget=forms.PasswordInput)

    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')
        confirm = self.cleaned_data.get('confirm')

        if password and confirm and password != confirm:
            raise forms.ValidationError("Parolar eşleşmiyor!")
        
        values = {
            'username' : username,
            'password':password
        }
        return values
    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'
        
