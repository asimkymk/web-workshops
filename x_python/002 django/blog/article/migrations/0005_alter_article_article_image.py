# Generated by Django 3.2.6 on 2021-08-22 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0004_alter_article_article_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='article_image',
            field=models.FileField(blank=True, null=True, upload_to='', verbose_name='Makaleye Fotoğraf ekleyin'),
        ),
    ]
